export const sleep = (n: number): Promise<void> =>
	new Promise((res) => setTimeout(res, n));

export const getCareerLength = (): string => {
	const start = new Date('03/14/2014');
	const now = new Date();
	const years = now.getFullYear() - start.getFullYear();
	const months = now.getMonth() - start.getMonth() || 0;

	if (months >= 8) {
		return `nearly ${years + 1} years`;
	}
	if (months > 5) {
		return `${years} and a half years`;
	}
	return `${years} years`;
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const clamp = (n: number, min: number, max: number) => {
	return Math.min(max, Math.max(n, min));
};

export const isBrowser = typeof window !== 'undefined';

export const noop = () => {};
