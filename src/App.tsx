import React, { useEffect, useRef, useState } from 'react';
import { RainBackground } from './components/RainBackground';
import { GameBoard } from './components/GameBoard';
import { ScorePanel } from './components/ScorePanel';
import { NextPiece } from './components/NextPiece';
import { ParticleOverlay } from './components/ParticleOverlay';
import { useTetris } from './hooks/useTetris';
import { THEMES, Theme } from './utils/themes';
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  const {
    stage,
    nextPiece,
    score,
    rows,
    level,
    gameOver,
    isPaused,
    clearedLines,
    gameStarted,
    movePlayer,
    dropPlayer,
    hardDrop,
    playerRotate,
    startGame,
    togglePause,
    keyUp,
  } = useTetris();

  const gameAreaRef = useRef<HTMLDivElement>(null);

  const move = (e: React.KeyboardEvent | KeyboardEvent) => {
    if (!gameOver && !isPaused && gameStarted) {
      if (e.keyCode === 37) {
        movePlayer(-1);
      } else if (e.keyCode === 39) {
        movePlayer(1);
      } else if (e.keyCode === 40) {
        dropPlayer();
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      } else if (e.keyCode === 32) {
        hardDrop();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
      move(e);
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keyUp({ keyCode: e.keyCode });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [move, keyUp]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white selection:bg-white/20">
      <RainBackground theme={currentTheme} />
      
      {/* Main UI Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 sm:p-8">
        
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            GLASSFALL
          </h1>
        </motion.div>

        {/* Game Container */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-center max-w-5xl w-full">
          
          {/* Left Panel - Score */}
          <div className="hidden md:block">
            <ScorePanel score={score} level={level} rows={rows} />
          </div>

          {/* Center - Game Board */}
          <div className="relative" ref={gameAreaRef}>
            <GameBoard stage={stage} clearedLines={clearedLines} theme={currentTheme} />
            <ParticleOverlay 
              clearedLines={clearedLines} 
              width={300} 
              height={600} 
              cellSize={30}
              theme={currentTheme}
            />

            {/* Game Over / Start Screen Overlay */}
            <AnimatePresence>
              {(gameOver || !gameStarted) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-xl border border-white/10"
                >
                  {gameOver ? (
                    <>
                      <h2 className="text-4xl font-bold text-red-500 mb-2 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">GAME OVER</h2>
                      <p className="text-xl text-white/80 mb-6">Final Score: {score}</p>
                    </>
                  ) : (
                    <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">READY?</h2>
                  )}
                  <button 
                    onClick={startGame}
                    className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 flex items-center gap-2 font-semibold tracking-wider hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    <Play size={20} />
                    {gameOver ? 'PLAY AGAIN' : 'START GAME'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Paused Overlay */}
            <AnimatePresence>
              {isPaused && !gameOver && gameStarted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl"
                >
                  <h2 className="text-3xl font-bold tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">PAUSED</h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-6">
            <NextPiece tetromino={nextPiece.tetromino} theme={currentTheme} />
            
            {/* Mobile Score (visible only on small screens) */}
            <div className="md:hidden flex gap-4 w-full max-w-[300px] justify-between">
              <div className="glass-panel rounded-xl p-3 flex-1 text-center">
                <div className="text-xs text-white/60 uppercase">Score</div>
                <div className="font-bold">{score}</div>
              </div>
              <div className="glass-panel rounded-xl p-3 flex-1 text-center">
                <div className="text-xs text-white/60 uppercase">Level</div>
                <div className="font-bold">{level}</div>
              </div>
            </div>

            {/* Controls */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-xl p-4 w-48 flex flex-col gap-4"
            >
              <span className="text-white/60 text-sm uppercase tracking-wider font-semibold text-center">Controls</span>
              <div className="grid grid-cols-3 gap-2">
                <div />
                <button onClick={() => playerRotate(stage, 1)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 flex justify-center items-center border border-white/10"><RotateCcw size={20} /></button>
                <div />
                <button onClick={() => movePlayer(-1)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 flex justify-center items-center border border-white/10"><ArrowLeft size={20} /></button>
                <button onClick={dropPlayer} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 flex justify-center items-center border border-white/10"><ArrowDown size={20} /></button>
                <button onClick={() => movePlayer(1)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 flex justify-center items-center border border-white/10"><ArrowRight size={20} /></button>
              </div>
              <button onClick={hardDrop} className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold tracking-wider">
                HARD DROP
              </button>
              <button onClick={togglePause} className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex justify-center items-center gap-2">
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            </motion.div>

            {/* Theme Selector */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-xl p-4 w-48 flex flex-col gap-3"
            >
              <span className="text-white/60 text-sm uppercase tracking-wider font-semibold text-center">Theme</span>
              <div className="flex flex-col gap-2">
                {THEMES.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => setCurrentTheme(t)} 
                    className={`py-2 rounded-lg text-xs font-bold transition-colors ${currentTheme.id === t.id ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/20 border border-white/10'}`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
