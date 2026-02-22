import React from 'react';
import { BlockData, GRID_ROWS, GRID_COLS } from '../types';
import { Block } from './Block';
import { AnimatePresence } from 'motion/react';

interface GameBoardProps {
  grid: BlockData[][];
  selectedIds: Set<string>;
  onBlockClick: (id: string) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ grid, selectedIds, onBlockClick }) => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[6/10] bg-slate-100/50 rounded-2xl p-2 border-4 border-slate-200 shadow-inner overflow-hidden">
      {/* Grid Background Lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-10 pointer-events-none opacity-10">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="border border-slate-400" />
        ))}
      </div>

      {/* Blocks */}
      <div className="relative w-full h-full grid grid-cols-6 grid-rows-10 gap-1.5">
        <AnimatePresence mode="popLayout">
          {grid.map((row, r) => 
            row.map((block, c) => {
              if (!block) return null;
              // We invert the row display because row 0 is the bottom
              const displayRow = GRID_ROWS - 1 - r;
              return (
                <div 
                  key={block.id}
                  style={{ 
                    gridColumnStart: c + 1, 
                    gridRowStart: displayRow + 1,
                  }}
                  className="w-full h-full"
                >
                  <Block 
                    block={block} 
                    isSelected={selectedIds.has(block.id)}
                    onClick={() => onBlockClick(block.id)}
                  />
                </div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Danger Zone Indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500/30 animate-pulse" />
    </div>
  );
};
