import React, { FC } from 'react';
import { format } from 'date-fns';

interface IHumanDate {
	date: number;
}
export const HumanDate: FC<IHumanDate> = ({ date }) =>
	date ? format(new Date(date), 'LLLL do R') : null;
