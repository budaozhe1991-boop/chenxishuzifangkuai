import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_ROWS, GRID_COLS, INITIAL_ROWS, TIME_LIMIT, BlockData, GameMode } from './types';
import { generateTarget, generateBlockValue, generateId } from './utils';
import confetti from 'canvas-confetti';

export function useGameLogic() {
  const [grid, setGrid] = useState<BlockData[][]>([]);
  const [target, setTarget] = useState(generateTarget());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('sumstack-highscore')) || 0);
  const [mode, setMode] = useState<GameMode>('classic');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isMusicEnabled, setIsMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('sumstack-music');
    return saved === null ? true : saved === 'true';
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle music playback
  useEffect(() => {
    if (!audioRef.current) return;

    if (isMusicEnabled && !isPaused && !isGameOver) {
      audioRef.current.play().catch(() => {
        // Handle autoplay block - user needs to interact first
        console.log('Autoplay blocked');
      });
    } else {
      audioRef.current.pause();
    }
  }, [isMusicEnabled, isPaused, isGameOver]);

  const toggleMusic = () => {
    setIsMusicEnabled(prev => {
      const next = !prev;
      localStorage.setItem('sumstack-music', String(next));
      return next;
    });
  };

  // Initialize grid
  const initGame = useCallback(() => {
    const newGrid: BlockData[][] = Array.from({ length: GRID_ROWS }, () => []);
    for (let r = 0; r < INITIAL_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        newGrid[r][c] = {
          id: generateId(),
          value: generateBlockValue(),
          row: r,
          col: c,
          isSelected: false,
        };
      }
    }
    setGrid(newGrid);
    setTarget(generateTarget());
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setTimeLeft(TIME_LIMIT);
    setSelectedIds(new Set());
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('sumstack-highscore', score.toString());
    }
  }, [score, highScore]);

  // Add a new row at the bottom
  const addRow = useCallback(() => {
    setGrid((prevGrid) => {
      // Check if any block is at the top row
      const isTopReached = prevGrid[GRID_ROWS - 1].some(block => block !== undefined);
      if (isTopReached) {
        setIsGameOver(true);
        return prevGrid;
      }

      const newGrid = [...prevGrid.map(row => [...row])];
      
      // Shift everything up
      for (let r = GRID_ROWS - 1; r > 0; r--) {
        newGrid[r] = newGrid[r - 1].map(block => block ? { ...block, row: r } : undefined) as any;
      }

      // Add new row at index 0
      newGrid[0] = Array.from({ length: GRID_COLS }, (_, c) => ({
        id: generateId(),
        value: generateBlockValue(),
        row: 0,
        col: c,
        isSelected: false,
      }));

      return newGrid;
    });
  }, []);

  // Timer logic for Time Mode
  useEffect(() => {
    if (mode === 'time' && !isGameOver && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            addRow();
            return TIME_LIMIT;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, isGameOver, isPaused, addRow]);

  const toggleSelect = (id: string) => {
    if (isGameOver || isPaused) return;

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Check sum
  useEffect(() => {
    const selectedBlocks: BlockData[] = [];
    grid.flat().forEach(block => {
      if (block && selectedIds.has(block.id)) {
        selectedBlocks.push(block);
      }
    });

    const currentSum = selectedBlocks.reduce((sum, b) => sum + b.value, 0);

    if (currentSum === target) {
      // Success!
      const points = selectedBlocks.length * 10;
      setScore(s => s + points);
      
      // Remove blocks
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => 
          row.map(block => block && selectedIds.has(block.id) ? undefined : block) as any
        );
        
        // Make blocks fall down
        for (let c = 0; c < GRID_COLS; c++) {
          let writeIdx = 0;
          for (let r = 0; r < GRID_ROWS; r++) {
            if (newGrid[r][c]) {
              const block = newGrid[r][c];
              newGrid[r][c] = undefined as any;
              newGrid[writeIdx][c] = { ...block, row: writeIdx };
              writeIdx++;
            }
          }
        }
        return newGrid;
      });

      setSelectedIds(new Set());
      setTarget(generateTarget());
      setTimeLeft(TIME_LIMIT);
      
      if (mode === 'classic') {
        addRow();
      }

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#6ee7b7']
      });
    } else if (currentSum > target) {
      // Failed - clear selection
      setSelectedIds(new Set());
    }
  }, [selectedIds, target, grid, mode, addRow]);

  return {
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
    isMusicEnabled,
    toggleMusic,
  };
}
