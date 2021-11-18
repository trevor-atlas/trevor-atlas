import React, { ChangeEvent, CSSProperties, FC } from 'react';
import styles from './input.module.scss';

interface IInput {
  name: string;
  placeholder?: string;
  value: string;
  style?: CSSProperties;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const Input: FC<IInput> = ({
  style,
  placeholder = 'Enter a value',
  value,
  name,
  onChange
}) => (
  <input
    style={style}
    className={styles.input}
    type="text"
    placeholder={placeholder}
    spellCheck
    aria-invalid="false"
    name={name}
    value={value}
    onChange={onChange}
  />
);
