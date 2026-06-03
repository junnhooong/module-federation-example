<template>
  <div class="standalone-app">
    <h1>Vue Vite Remote - Standalone</h1>
    <p>This remote can run independently or be consumed by the shell</p>
    <Timeline />
  </div>
</template>

<script setup lang="ts">
import Timeline from './components/Timeline.vue';
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

.standalone-app {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.standalone-app h1 {
  color: #42b883;
  margin-bottom: 8px;
}

.standalone-app > p {
  color: #666;
  margin-bottom: 32px;
}
</style>
