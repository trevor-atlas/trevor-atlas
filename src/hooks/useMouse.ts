import { useEffect, useRef } from 'react';

const useMouse = () => {
  const mouse = useRef({ x: null, y: null });

  const updateMousePosition = (ev) => {
    mouse.current = { x: ev.clientX, y: ev.clientY };
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mouse;
};

export default useMouse;
