import React from 'react';
import { Target, Trophy, Clock, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { GameMode, TIME_LIMIT } from '../types';
import { cn } from '../utils';

interface GameHeaderProps {
  target: number;
  score: number;
  highScore: number;
  mode: GameMode;
  timeLeft: number;
  isPaused: boolean;
  isMusicEnabled: boolean;
  onTogglePause: () => void;
  onToggleMusic: () => void;
  onReset: () => void;
  onModeChange: (mode: GameMode) => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  target,
  score,
  highScore,
  mode,
  timeLeft,
  isPaused,
  isMusicEnabled,
  onTogglePause,
  onToggleMusic,
  onReset,
  onModeChange,
}) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => onModeChange('classic')}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              mode === 'classic' ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-500 hover:bg-slate-300"
            )}
          >
            Classic
          </button>
          <button
            onClick={() => onModeChange('time')}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              mode === 'time' ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-500 hover:bg-slate-300"
            )}
          >
            Time
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={onToggleMusic} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="Toggle Music">
            {isMusicEnabled ? <Volume2 size={20} className="text-slate-600" /> : <VolumeX size={20} className="text-slate-600" />}
          </button>
          <button onClick={onReset} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="Reset Game">
            <RotateCcw size={20} className="text-slate-600" />
          </button>
          <button onClick={onTogglePause} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title={isPaused ? "Resume" : "Pause"}>
            {isPaused ? <Play size={20} className="text-slate-600" /> : <Pause size={20} className="text-slate-600" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Target</span>
          <div className="flex items-center gap-2">
            <Target size={18} className="text-emerald-500" />
            <span className="text-4xl font-black text-slate-800">{target}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Score</span>
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            <span className="text-4xl font-black text-slate-800">{score}</span>
          </div>
        </div>
      </div>

      {mode === 'time' && (
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-1000 ease-linear",
              timeLeft < 3 ? "bg-red-500" : "bg-emerald-500"
            )}
            style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
          />
        </div>
      )}

      <div className="flex justify-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          High Score: {highScore}
        </span>
      </div>
    </div>
  );
};
