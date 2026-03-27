export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  color: string;
  glow: string;
}

export const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: {
    type: 'I',
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    color: 'rgba(0, 229, 255, 0.8)',
    glow: 'rgba(0, 229, 255, 0.5)'
  },
  J: {
    type: 'J',
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    color: 'rgba(41, 121, 255, 0.8)',
    glow: 'rgba(41, 121, 255, 0.5)'
  },
  L: {
    type: 'L',
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    color: 'rgba(255, 145, 0, 0.8)',
    glow: 'rgba(255, 145, 0, 0.5)'
  },
  O: {
    type: 'O',
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'rgba(255, 234, 0, 0.8)',
    glow: 'rgba(255, 234, 0, 0.5)'
  },
  S: {
    type: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: 'rgba(0, 230, 118, 0.8)',
    glow: 'rgba(0, 230, 118, 0.5)'
  },
  T: {
    type: 'T',
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    color: 'rgba(213, 0, 249, 0.8)',
    glow: 'rgba(213, 0, 249, 0.5)'
  },
  Z: {
    type: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: 'rgba(255, 23, 68, 0.8)',
    glow: 'rgba(255, 23, 68, 0.5)'
  }
};

export const randomTetromino = (): { type: TetrominoType; tetromino: Tetromino } => {
  const keys = Object.keys(TETROMINOES) as TetrominoType[];
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return { type: randKey, tetromino: TETROMINOES[randKey] };
};
