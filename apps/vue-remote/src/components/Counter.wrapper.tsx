import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import Counter from './Counter.vue';

const VueCounterWrapper: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const app = createApp(Counter);
      app.mount(ref.current);

      return () => {
        app.unmount();
      };
    }
  }, []);

  return <div ref={ref} />;
};

export default VueCounterWrapper;
