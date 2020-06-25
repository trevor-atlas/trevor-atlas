import React from 'react';

interface Props {
	className?: string;
}

export const Container: React.FunctionComponent<Props> = ({
	className,
	children
}) => <div className={`container ${className}`}>{children}</div>;
