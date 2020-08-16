import React, { FC } from 'react';
import styles from './button.module.scss';

interface IButton {
	text: string;
	onClick(): void;
	disabled?: boolean;
	className?: string;
}

export const Button: FC<IButton> = ({ className, disabled, onClick, text }) => {
	return (
		<button
			disabled={disabled}
			className={`${styles.button} ${
				disabled && styles.disabled
			} ${className}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
