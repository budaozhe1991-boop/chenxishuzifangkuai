/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameHeader } from './components/GameHeader';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './useGameLogic';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

export default function App() {
  const {
    grid,
    target,
    score,
    highScore,
    mode,
    setMode,
    isGameOver,
    isPaused,
    setIsPaused,
    timeLeft,
    selectedIds,
    toggleSelect,
    initGame,
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-slate-800 mb-1 italic">
          陈星的<span className="text-emerald-500">数字积木</span>
        </h1>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          极致数学谜题
        </p>
      </header>

      <main className="w-full max-w-md relative">
        <GameHeader
          target={target}
          score={score}
          highScore={highScore}
          mode={mode}
          timeLeft={timeLeft}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(!isPaused)}
          onReset={initGame}
          onModeChange={setMode}
        />

        <div className="relative">
          <GameBoard 
            grid={grid} 
            selectedIds={selectedIds} 
            onBlockClick={toggleSelect} 
          />

          {/* Overlays */}
          <AnimatePresence>
            {isGameOver && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl shadow-2xl max-w-xs w-full"
                >
                  <Trophy size={64} className="text-amber-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-black text-slate-800 mb-2">GAME OVER</h2>
                  <p className="text-slate-500 mb-6 font-medium">
                    You reached the top! Your final score is <span className="text-emerald-600 font-bold">{score}</span>.
                  </p>
                  <button
                    onClick={initGame}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={20} />
                    PLAY AGAIN
                  </button>
                </motion.div>
              </motion.div>
            )}

            {isPaused && !isGameOver && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-slate-100/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center"
              >
                <button
                  onClick={() => setIsPaused(false)}
                  className="p-8 bg-white rounded-full shadow-2xl text-slate-800 hover:scale-110 transition-transform"
                >
                  <Play size={48} fill="currentColor" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="mt-8 text-center space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">玩法说明</h3>
            <ul className="text-sm text-slate-600 space-y-1 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">1.</span>
                点击数字，使它们的总和等于目标数字。
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">2.</span>
                不要让积木堆到顶部的红线！
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">3.</span>
                在计时模式下，每 50 秒会新增一行。
              </li>
            </ul>
          </div>
          
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            Crafted with React & Tailwind
          </p>
        </footer>
      </main>
    </div>
  );
}
