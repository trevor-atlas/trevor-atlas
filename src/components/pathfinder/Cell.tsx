import React from 'react';
import './Cell.css';

interface Props {
	col: number;
	row: number;
	isEnd: boolean;
	isStart: boolean;
	isWall: boolean;
	onMouseDown: () => void;
	onMouseEnter: () => void;
	onMouseUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Cell: React.FunctionComponent<Props> = (props) => {
	const {
		col,
		row,
		isStart,
		isEnd,
		isWall,
		onMouseDown,
		onMouseEnter,
		onMouseUp
	} = props;

	const extraClassName = isEnd
		? 'cell-finish'
		: isStart
		? 'cell-start'
		: isWall
		? 'cell-wall'
		: '';

	return (
		<div
			id={`cell-${row}-${col}`}
			className={`cell ${extraClassName}`}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			onMouseUp={onMouseUp}
		/>
	);
};
