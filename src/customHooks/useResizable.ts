import { useEffect, useRef, useState } from 'react';
import { INITIAL_HEIGHT, INITIAL_WIDTH } from '../constants';

export const useResizable = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: INITIAL_WIDTH, height: INITIAL_HEIGHT });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [ref, size] as const;
};
