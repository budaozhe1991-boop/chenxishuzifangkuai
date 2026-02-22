export type GameMode = 'classic' | 'time';

export interface BlockData {
  id: string;
  value: number;
  row: number;
  col: number;
  isSelected: boolean;
}

export interface GameState {
  grid: BlockData[][];
  target: number;
  score: number;
  highScore: number;
  mode: GameMode;
  isGameOver: boolean;
  isPaused: boolean;
  timeLeft: number; // For time mode
  combo: number;
}

export const GRID_ROWS = 10;
export const GRID_COLS = 6;
export const INITIAL_ROWS = 4;
export const TIME_LIMIT = 50; // seconds per round in time mode
