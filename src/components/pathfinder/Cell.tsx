import React, { FC } from 'react';
import styles from './cell.module.scss';

interface CellProps {
  col?: number;
  row?: number;
  isEnd?: boolean;
  isStart?: boolean;
  isWall?: boolean;
  isShortest?: boolean;
  isVisited?: boolean;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Cell({
  col,
  row,
  isStart,
  isEnd,
  isWall,
  isShortest,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp
}: CellProps) {
  const type = isShortest
    ? styles.shortest
    : isEnd
    ? styles.finish
    : isStart
    ? styles.start
    : isWall
    ? styles.wall
    : isVisited
    ? styles.visited
    : '';

  return (
    <div
      id={`cell-${row}-${col}`}
      className={`${styles.cell} ${type}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    />
  );
}
