import React, { ChangeEvent, CSSProperties } from 'react';
import styles from './input.module.scss';
import { FC } from 'react';

interface IInput {
	name: string;
	placeholder?: string;
	value: string;
	style?: CSSProperties;
	onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const Input: FC<IInput> = ({
	style,
	placeholder,
	value,
	name,
	onChange
}) => {
	return (
		<input
			style={style}
			className={styles.input}
			type="text"
			placeholder={placeholder || 'Enter a value'}
			spellCheck={true}
			aria-invalid="false"
			name={name}
			value={value}
			onChange={onChange}
		/>
	);
};
