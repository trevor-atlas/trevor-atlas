export const sleep = (n: number): Promise<void> =>
  new Promise((res) => setTimeout(res, n));

export const getRelativeX = (x: number) => {
  const center = window.innerWidth / 2;
  return x < center ? center - x : x - center;
};

export const getRelativeY = (x: number) => {
  const center = window.innerHeight / 2;
  return x < center ? center - x : x - center;
};

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
export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(n, min));

export const isBrowser = typeof window !== 'undefined';

export const noop = () => {};

export const removeStaleServiceWorkers = () => {
	const key = 'atlas_cleared_serviceworkers';
	const hasRun = localStorage.getItem(key);
	if (typeof hasRun !== 'string' || hasRun === '') {
		console.log('clearing stale service workers');
		navigator.serviceWorker
			.getRegistrations()
			.then(async (registrations) => {
				for (const registration of registrations) {
					await registration.unregister();
				}
			});
		localStorage.setItem(key, 'true');
		location.reload();
	}
};
