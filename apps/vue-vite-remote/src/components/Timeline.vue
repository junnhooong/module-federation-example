<template>
  <div class="timeline">
    <h3>Vue + Vite Timeline</h3>
    <p>Interactive timeline built with Vite</p>

    <div class="timeline-items">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="timeline-item"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      >
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <small>{{ item.date }}</small>
        </div>
      </div>
    </div>

    <small class="port-info">Running on port 3005</small>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

const activeIndex = ref(0);

const items: TimelineItem[] = [
  {
    title: 'Project Started',
    description: 'Initial setup with Vite',
    date: '2024-01-01'
  },
  {
    title: 'Module Federation Added',
    description: 'Integrated MF 2.0',
    date: '2024-02-15'
  },
  {
    title: 'Production Ready',
    description: 'Deployed to production',
    date: '2024-03-20'
  }
];
</script>

<style scoped>
.timeline {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 500px;
}

.timeline h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
}

.timeline > p {
  margin: 0 0 20px 0;
  opacity: 0.9;
  font-size: 14px;
}

.timeline-items {
  margin-bottom: 16px;
}

.timeline-item {
  position: relative;
  padding-left: 32px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.timeline-item:hover {
  transform: translateX(4px);
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 4px;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  border: 2px solid white;
  transition: all 0.3s;
}

.timeline-item.active .timeline-marker {
  background: white;
  transform: scale(1.3);
}

.timeline-content h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
}

.timeline-content p {
  margin: 0 0 4px 0;
  opacity: 0.8;
  font-size: 13px;
}

.timeline-content small {
  opacity: 0.6;
  font-size: 11px;
}

.port-info {
  opacity: 0.7;
  font-size: 12px;
}
</style>
