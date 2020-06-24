export const sleep = (n: number, cb: () => void): Promise<void> =>
	new Promise((res) => setTimeout(res, n)).then(cb);
