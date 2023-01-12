import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useIsVisible = (): [boolean, MutableRefObject<any>] => {
  const [visible, setVisibility] = useState(false);
  const trigger = useRef<null | HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      const topPosition =
        (trigger &&
          trigger.current &&
          trigger.current.getBoundingClientRect().bottom -
            trigger.current.getBoundingClientRect().height / 4) ||
        0;
      if (topPosition < scrollPosition) {
        setVisibility(true);
      }
    };
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return [visible, trigger];
};
