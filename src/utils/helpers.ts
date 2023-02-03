import { None, Nullable } from 'src/types';

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

export const CAREER_START_DATE: Readonly<Date> = new Date('03/14/2013');

export const getCareerLength = (): string => {
  const now = new Date();
  const years = now.getFullYear() - CAREER_START_DATE.getFullYear();
  const months = now.getMonth() - CAREER_START_DATE.getMonth();

  if (months >= 8) {
    return `nearly ${years + 1} years`;
  }
  if (months >= 6) {
    return `${years} and a half years`;
  }
  return `${years} years`;
};

export function fetcher<T>(resource: RequestInfo | URL, init?: RequestInit) {
  return async (): Promise<T> => {
    try {
      const response = await fetch(resource, init);
      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(n, min));

export const isBrowser = typeof window !== 'undefined';

export function noop() {}

export const removeStaleServiceWorkers = () => {
  const key = 'atlas_cleared_serviceworkers';
  const hasRun = localStorage.getItem(key);
  if (typeof hasRun !== 'string' || hasRun === '') {
    console.log('clearing stale service workers');
    navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      for (const registration of registrations) {
        await registration.unregister();
      }
    });
    localStorage.setItem(key, 'true');
    location.reload();
  }
};

export function isNone<T>(value: Nullable<T>): value is None {
  return value === null || value === undefined;
}

export function isSome<T>(value: Nullable<T>): value is T {
  return !isNone(value);
}
