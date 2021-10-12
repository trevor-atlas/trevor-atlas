import { useEffect } from 'react';
import { ONE_SECOND } from 'src/utils/constants';

export const useTimedUpdate = <T>(
  onUpdate: () => T,
  updateIn: number,
  deps: unknown[]
): void => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onUpdate();
    }, updateIn || ONE_SECOND * 30);

    return () => clearTimeout(timeout);
  }, deps);
};
