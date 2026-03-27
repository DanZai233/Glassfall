import React from 'react';
import { motion } from 'motion/react';

interface ScorePanelProps {
  score: number;
  level: number;
  rows: number;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({ score, level, rows }) => {
  return (
    <div className="flex flex-col gap-4 w-48">
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-xl p-4 flex flex-col items-center"
      >
        <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">Score</span>
        <span className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {score}
        </span>
      </motion.div>
      
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-xl p-4 flex flex-col items-center"
      >
        <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">Level</span>
        <span className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {level}
        </span>
      </motion.div>

      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-panel rounded-xl p-4 flex flex-col items-center"
      >
        <span className="text-white/60 text-sm uppercase tracking-wider font-semibold">Lines</span>
        <span className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {rows}
        </span>
      </motion.div>
    </div>
  );
};
