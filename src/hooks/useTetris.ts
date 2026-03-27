import { useState, useCallback, useEffect } from 'react';
import { TETROMINOES, randomTetromino, Tetromino } from '../utils/tetrominoes';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export type Cell = [Tetromino | null, 'clear' | 'merged'];
export type Stage = Cell[][];

export const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([null, 'clear'])
  );

export const checkCollision = (
  player: any,
  stage: Stage,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  for (let y = 0; y < player.tetromino.shape.length; y += 1) {
    for (let x = 0; x < player.tetromino.shape[y].length; x += 1) {
      if (player.tetromino.shape[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const useTetris = () => {
  const [stage, setStage] = useState<Stage>(createStage());
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [nextPiece, setNextPiece] = useState<{ type: string; tetromino: Tetromino }>(randomTetromino());
  const [clearedLines, setClearedLines] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOES.I,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: nextPiece.tetromino,
      collided: false,
    });
    setNextPiece(randomTetromino());
  }, [nextPiece]);

  const rotate = (matrix: number[][], dir: number) => {
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage: Stage, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino.shape[0].length) {
        rotate(clonedPlayer.tetromino.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const sweepRows = useCallback((newStage: Stage) => {
    let linesCleared = 0;
    const clearedRowIndices: number[] = [];

    const sweptStage = newStage.reduce((ack, row, index) => {
      if (row.findIndex((cell) => cell[1] === 'clear') === -1) {
        linesCleared += 1;
        clearedRowIndices.push(index);
        ack.unshift(new Array(STAGE_WIDTH).fill([null, 'clear']));
        return ack;
      }
      ack.push(row);
      return ack;
    }, [] as Stage);

    if (linesCleared > 0) {
      setScore((prev) => prev + [40, 100, 300, 1200][linesCleared - 1] * level);
      setRows((prev) => prev + linesCleared);
      setClearedLines(clearedRowIndices);
      setTimeout(() => setClearedLines([]), 500);
    }

    return sweptStage;
  }, [level]);

  const updateStage = useCallback(() => {
    const newStage = stage.map((row) =>
      row.map((cell) => (cell[1] === 'clear' ? [null, 'clear'] : cell))
    ) as Stage;

    player.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          if (
            newStage[y + player.pos.y] &&
            newStage[y + player.pos.y][x + player.pos.x]
          ) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              player.tetromino,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        }
      });
    });

    if (player.collided) {
      resetPlayer();
      return sweepRows(newStage);
    }

    return newStage;
  }, [player, resetPlayer, stage, sweepRows]);

  useEffect(() => {
    setStage(updateStage());
  }, [player.pos.x, player.pos.y, player.tetromino, player.collided]);

  const drop = useCallback(() => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }, [player, stage, rows, level]);

  const keyUp = ({ keyCode }: { keyCode: number }) => {
    if (!gameOver && !isPaused) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const hardDrop = () => {
    let tmpY = 0;
    while (!checkCollision(player, stage, { x: 0, y: tmpY + 1 })) {
      tmpY += 1;
    }
    updatePlayerPos({ x: 0, y: tmpY, collided: true });
  };

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    setRows(0);
    setLevel(1);
    setIsPaused(false);
  };

  const togglePause = () => {
    if (gameOver) return;
    if (isPaused) {
      setIsPaused(false);
      setDropTime(1000 / (level + 1) + 200);
    } else {
      setIsPaused(true);
      setDropTime(null);
    }
  };

  useEffect(() => {
    let interval: any;
    if (dropTime && !isPaused && !gameOver) {
      interval = setInterval(() => {
        drop();
      }, dropTime);
    }
    return () => {
      clearInterval(interval);
    };
  }, [dropTime, isPaused, gameOver, drop]);

  return {
    stage,
    player,
    nextPiece,
    score,
    rows,
    level,
    gameOver,
    isPaused,
    clearedLines,
    movePlayer,
    dropPlayer,
    hardDrop,
    playerRotate,
    startGame,
    togglePause,
    keyUp,
    gameStarted,
  };
};
