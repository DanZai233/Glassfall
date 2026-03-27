import React, { useEffect, useRef } from 'react';
import { Theme } from '../utils/themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ParticleOverlayProps {
  clearedLines: number[];
  width: number;
  height: number;
  cellSize: number;
  theme: Theme;
}

export const ParticleOverlay: React.FC<ParticleOverlayProps> = ({
  clearedLines,
  width,
  height,
  cellSize,
  theme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (clearedLines.length > 0) {
      const newParticles: Particle[] = [];
      const colors = Object.values(theme.blockColors).map(c => c.color);
      
      clearedLines.forEach((lineIdx) => {
        const y = lineIdx * cellSize + cellSize / 2;
        for (let x = 0; x < width; x += 10) {
          for (let i = 0; i < 5; i++) {
            newParticles.push({
              x,
              y,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              life: 1,
              maxLife: Math.random() * 30 + 20,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: Math.random() * 4 + 1,
            });
          }
        }
      });
      particlesRef.current.push(...newParticles);
    }
  }, [clearedLines, width, cellSize, theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = 1 - p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-none z-20"
    />
  );
};
