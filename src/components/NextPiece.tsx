import React from 'react';
import { Tetromino } from '../utils/tetrominoes';
import { motion } from 'motion/react';
import { Theme } from '../utils/themes';

interface NextPieceProps {
  tetromino: Tetromino;
  theme: Theme;
}

export const NextPiece: React.FC<NextPieceProps> = ({ tetromino, theme }) => {
  // Create a 4x4 grid to center the piece
  const grid = Array.from(Array(4), () => new Array(4).fill(0));
  
  // Center the shape in the 4x4 grid
  const shape = tetromino.shape;
  const offsetY = Math.floor((4 - shape.length) / 2);
  const offsetX = Math.floor((4 - shape[0].length) / 2);

  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        grid[y + offsetY][x + offsetX] = 1;
      }
    });
  });

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-panel rounded-xl p-4 w-48 flex flex-col items-center"
    >
      <span className="text-white/60 text-sm uppercase tracking-wider font-semibold mb-4">Next</span>
      <div 
        className="grid gap-1"
        style={{
          gridTemplateRows: 'repeat(4, 1fr)',
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '100px',
          height: '100px',
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => {
            const cellColor = cell ? theme.blockColors[tetromino.type].color : 'transparent';
            const cellGlow = cell ? theme.blockColors[tetromino.type].glow : 'transparent';
            return (
              <div
                key={`${x}-${y}`}
                className="w-full h-full rounded-sm"
                style={{
                  backgroundColor: cellColor,
                  boxShadow: cell ? `0 0 10px ${cellGlow}, inset 0 0 5px rgba(255,255,255,0.5)` : 'none',
                }}
              />
            );
          })
        )}
      </div>
    </motion.div>
  );
};
