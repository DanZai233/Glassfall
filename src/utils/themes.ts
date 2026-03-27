import { TetrominoType } from './tetrominoes';

export interface Theme {
  id: string;
  name: string;
  blockColors: Record<TetrominoType, { color: string; glow: string }>;
  bgLights: { light1: number[]; light2: number[]; light3: number[]; base: number[] };
}

export const THEMES: Theme[] = [
  {
    id: 'neon',
    name: 'Neon City',
    blockColors: {
      I: { color: 'rgba(0, 229, 255, 0.8)', glow: 'rgba(0, 229, 255, 0.5)' },
      J: { color: 'rgba(41, 121, 255, 0.8)', glow: 'rgba(41, 121, 255, 0.5)' },
      L: { color: 'rgba(255, 145, 0, 0.8)', glow: 'rgba(255, 145, 0, 0.5)' },
      O: { color: 'rgba(255, 234, 0, 0.8)', glow: 'rgba(255, 234, 0, 0.5)' },
      S: { color: 'rgba(0, 230, 118, 0.8)', glow: 'rgba(0, 230, 118, 0.5)' },
      T: { color: 'rgba(213, 0, 249, 0.8)', glow: 'rgba(213, 0, 249, 0.5)' },
      Z: { color: 'rgba(255, 23, 68, 0.8)', glow: 'rgba(255, 23, 68, 0.5)' }
    },
    bgLights: {
      light1: [1.0, 0.2, 0.5],
      light2: [0.2, 0.8, 1.0],
      light3: [0.5, 0.1, 0.8],
      base: [0.05, 0.05, 0.15]
    }
  },
  {
    id: 'matrix',
    name: 'The Matrix',
    blockColors: {
      I: { color: 'rgba(0, 255, 65, 0.8)', glow: 'rgba(0, 255, 65, 0.5)' },
      J: { color: 'rgba(0, 200, 50, 0.8)', glow: 'rgba(0, 200, 50, 0.5)' },
      L: { color: 'rgba(0, 180, 40, 0.8)', glow: 'rgba(0, 180, 40, 0.5)' },
      O: { color: 'rgba(0, 220, 55, 0.8)', glow: 'rgba(0, 220, 55, 0.5)' },
      S: { color: 'rgba(0, 255, 65, 0.8)', glow: 'rgba(0, 255, 65, 0.5)' },
      T: { color: 'rgba(0, 150, 30, 0.8)', glow: 'rgba(0, 150, 30, 0.5)' },
      Z: { color: 'rgba(0, 240, 60, 0.8)', glow: 'rgba(0, 240, 60, 0.5)' }
    },
    bgLights: {
      light1: [0.0, 1.0, 0.2],
      light2: [0.0, 0.5, 0.1],
      light3: [0.0, 0.8, 0.2],
      base: [0.02, 0.05, 0.02]
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    blockColors: {
      I: { color: 'rgba(255, 0, 255, 0.8)', glow: 'rgba(255, 0, 255, 0.5)' },
      J: { color: 'rgba(0, 255, 255, 0.8)', glow: 'rgba(0, 255, 255, 0.5)' },
      L: { color: 'rgba(255, 165, 0, 0.8)', glow: 'rgba(255, 165, 0, 0.5)' },
      O: { color: 'rgba(255, 255, 0, 0.8)', glow: 'rgba(255, 255, 0, 0.5)' },
      S: { color: 'rgba(255, 0, 128, 0.8)', glow: 'rgba(255, 0, 128, 0.5)' },
      T: { color: 'rgba(128, 0, 255, 0.8)', glow: 'rgba(128, 0, 255, 0.5)' },
      Z: { color: 'rgba(255, 69, 0, 0.8)', glow: 'rgba(255, 69, 0, 0.5)' }
    },
    bgLights: {
      light1: [1.0, 0.0, 1.0],
      light2: [0.0, 1.0, 1.0],
      light3: [1.0, 0.5, 0.0],
      base: [0.1, 0.02, 0.1]
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    blockColors: {
      I: { color: 'rgba(255, 255, 255, 0.8)', glow: 'rgba(255, 255, 255, 0.5)' },
      J: { color: 'rgba(200, 200, 200, 0.8)', glow: 'rgba(200, 200, 200, 0.5)' },
      L: { color: 'rgba(180, 180, 180, 0.8)', glow: 'rgba(180, 180, 180, 0.5)' },
      O: { color: 'rgba(220, 220, 220, 0.8)', glow: 'rgba(220, 220, 220, 0.5)' },
      S: { color: 'rgba(150, 150, 150, 0.8)', glow: 'rgba(150, 150, 150, 0.5)' },
      T: { color: 'rgba(240, 240, 240, 0.8)', glow: 'rgba(240, 240, 240, 0.5)' },
      Z: { color: 'rgba(120, 120, 120, 0.8)', glow: 'rgba(120, 120, 120, 0.5)' }
    },
    bgLights: {
      light1: [0.8, 0.8, 0.8],
      light2: [0.5, 0.5, 0.5],
      light3: [0.3, 0.3, 0.3],
      base: [0.05, 0.05, 0.05]
    }
  }
];
