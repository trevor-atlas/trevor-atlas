import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

const throttle = (fn: Function, args?: any[], wait: number = 100) => {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;

  const context = this;
  return function () {
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

export const useIsVisible = (): [boolean, MutableRefObject<any>] => {
  const [visible, setVisibility] = useState(false);
  const trigger = useRef<null | HTMLElement>(null);
  useEffect(() => {
    const onScroll = throttle(
      () => {
        console.log('scrolling');
        const topPosition =
          (trigger?.current &&
            trigger.current.getBoundingClientRect().bottom) ||
          0;

        // page started out scrolled past this element
        if (topPosition < 0) {
          setVisibility(true);
        }

        if (topPosition < window.innerHeight && topPosition > 0) {
          setVisibility(true);
        }
      },
      void 0,
      50
    );

    if (visible) {
      return () => window.removeEventListener('scroll', onScroll);
    }
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);
  return [visible, trigger];
};
