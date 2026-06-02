import React, { useEffect, useRef } from 'react';
import Card from './Card.svelte';

const SvelteCardWrapper: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const app = new Card({
        target: ref.current,
      });

      return () => {
        app.$destroy();
      };
    }
  }, []);

  return <div ref={ref} />;
};

export default SvelteCardWrapper;
