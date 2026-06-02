import { createApp } from 'vue';
import Counter from './components/Counter.vue';

const app = createApp({
  components: { Counter },
  template: `
    <div style="padding: 2rem;">
      <h1>Vue Remote - Standalone Mode</h1>
      <Counter />
    </div>
  `
});

app.mount('#root');
