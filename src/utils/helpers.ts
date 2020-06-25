import { Duration } from 'luxon';

export const sleep = (n: number, cb: () => void): Promise<void> =>
	new Promise((res) => setTimeout(res, n)).then(cb);

export const getCareerLength = () => {
	const start = new Date('03/14/2014');
	const now = new Date();
	const duration = Duration.fromObject({
		years: now.getFullYear() - start.getFullYear(),
		months: now.getMonth() - start.getMonth() || 0
	});

	const years = duration.get('years');
	const months = duration.get('months');
	if (months >= 8) {
		return `nearly ${years + 1} years`;
	}
	if (months > 5) {
		return `${years} and a half years`;
	}
	return `${years} years`;
};
