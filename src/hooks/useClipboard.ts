import { useEffect, useRef } from 'react';

export function useClipboard(selector: string) {
  const addedClickListeners = useRef(false);

  useEffect(() => {
    if (addedClickListeners.current) {
      return;
    }
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener('click', () => {
        if (!('clipboard' in navigator)) {
          console.log('Clipboard API not supported');
          return;
        }
        const id = el.getAttribute('id') as string;
        window.location.hash = '';
        window.location.hash = id;
        navigator.clipboard.writeText(window.location.href);
      });
    });
    addedClickListeners.current = true;
  }, []);
}
