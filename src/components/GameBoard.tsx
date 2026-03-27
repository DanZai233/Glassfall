import React from 'react';
import { Stage } from '../hooks/useTetris';
import { motion } from 'motion/react';
import { Theme } from '../utils/themes';

interface GameBoardProps {
  stage: Stage;
  clearedLines: number[];
  theme: Theme;
}

export const GameBoard: React.FC<GameBoardProps> = ({ stage, clearedLines, theme }) => {
  return (
    <div className="relative glass-panel rounded-xl p-2 overflow-hidden">
      <div 
        className="grid bg-black/40 rounded-lg overflow-hidden border border-white/10"
        style={{
          gridTemplateRows: `repeat(${stage.length}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${stage[0].length}, minmax(0, 1fr))`,
          width: '300px',
          height: '600px',
        }}
      >
        {stage.map((row, y) =>
          row.map((cell, x) => {
            const isCleared = clearedLines.includes(y);
            const cellColor = cell[0] ? theme.blockColors[cell[0].type].color : 'transparent';
            const cellGlow = cell[0] ? theme.blockColors[cell[0].type].glow : 'transparent';
            
            return (
              <motion.div
                key={`${x}-${y}`}
                initial={false}
                animate={isCleared ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full border-[0.5px] border-white/5"
                style={{
                  backgroundColor: cellColor,
                  boxShadow: cell[0] ? `0 0 10px ${cellGlow}, inset 0 0 10px rgba(255,255,255,0.5)` : 'none',
                  borderRadius: cell[0] ? '4px' : '0px',
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
