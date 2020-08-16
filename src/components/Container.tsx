import React from 'react';

interface Props {
	className?: string;
}

export const Container: React.FunctionComponent<Props> = ({
	className,
	children
}) => <div className={`container mx-auto px-8 ${className}`}>{children}</div>;
