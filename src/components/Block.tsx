import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlockData } from '../types';
import { cn } from '../utils';

interface BlockProps {
  block: BlockData;
  isSelected: boolean;
  onClick: () => void;
}

const COLOR_MAP: Record<number, string> = {
  1: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  2: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  3: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
  4: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200",
  5: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
  6: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
  7: "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200",
  8: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
  9: "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200",
};

export const Block: React.FC<BlockProps> = ({ block, isSelected, onClick }) => {
  const colorClass = COLOR_MAP[block.value] || "bg-white text-slate-800 border-slate-200";

  return (
    <motion.button
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "w-full aspect-square flex items-center justify-center rounded-lg text-2xl font-bold transition-all duration-200 shadow-sm border-2",
        isSelected 
          ? "bg-emerald-600 text-white border-emerald-700 shadow-emerald-200 scale-95" 
          : colorClass
      )}
    >
      {block.value}
    </motion.button>
  );
};
