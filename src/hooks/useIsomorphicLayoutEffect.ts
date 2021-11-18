import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from 'src/utils/helpers';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
