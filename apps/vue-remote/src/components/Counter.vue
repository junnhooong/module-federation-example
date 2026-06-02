<template>
  <div class="vue-counter-container">
    <div class="counter-display">{{ count }}</div>
    <div class="counter-buttons">
      <button class="vue-button decrement" @click="decrement">-</button>
      <button class="vue-button increment" @click="increment">+</button>
    </div>
    <button class="vue-button reset" @click="reset">Reset</button>
    <p class="framework-badge">💚 Built with Vue</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};

const reset = () => {
  count.value = 0;
};
</script>

<style scoped>
.vue-counter-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.counter-display {
  font-size: 3rem;
  font-weight: bold;
  color: #42b883;
  min-width: 100px;
  text-align: center;
}

.counter-buttons {
  display: flex;
  gap: 1rem;
}

.vue-button {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3);
  min-width: 60px;
}

.vue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 184, 131, 0.4);
}

.vue-button:active {
  transform: translateY(0);
}

.vue-button.reset {
  background: linear-gradient(135deg, #35495e 0%, #42b883 100%);
}

.framework-badge {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}
</style>
