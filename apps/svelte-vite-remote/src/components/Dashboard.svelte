<script lang="ts">
  interface Stat {
    label: string;
    value: number;
    unit: string;
    trend: 'up' | 'down';
  }

  let stats: Stat[] = [
    { label: 'Active Users', value: 1234, unit: '', trend: 'up' },
    { label: 'Revenue', value: 89, unit: 'k', trend: 'up' },
    { label: 'Conversion', value: 12.5, unit: '%', trend: 'down' },
    { label: 'Avg. Session', value: 4.2, unit: 'min', trend: 'up' }
  ];

  function handleRefresh() {
    stats = stats.map(stat => ({
      ...stat,
      value: stat.value + (Math.random() - 0.5) * 10
    }));
  }
</script>

<div class="dashboard">
  <div class="dashboard-header">
    <div>
      <h3>Svelte + Vite Dashboard</h3>
      <p>Real-time metrics built with Vite</p>
    </div>
    <button on:click={handleRefresh}>↻ Refresh</button>
  </div>

  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-card">
        <span class="stat-label">{stat.label}</span>
        <div class="stat-value">
          {stat.value.toFixed(stat.unit === '%' ? 1 : 0)}{stat.unit}
          <span class="trend" class:up={stat.trend === 'up'} class:down={stat.trend === 'down'}>
            {stat.trend === 'up' ? '↑' : '↓'}
          </span>
        </div>
      </div>
    {/each}
  </div>

  <small class="port-info">Running on port 3006</small>
</div>

<style>
  .dashboard {
    background: linear-gradient(135deg, #ff3e00 0%, #ff8c00 100%);
    color: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 600px;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .dashboard h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
  }

  .dashboard p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }

  .dashboard-header button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
  }

  .dashboard-header button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(180deg);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.15);
    padding: 16px;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .stat-label {
    display: block;
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .trend {
    font-size: 16px;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .trend.up {
    background: rgba(0, 255, 0, 0.2);
  }

  .trend.down {
    background: rgba(255, 0, 0, 0.2);
  }

  .port-info {
    opacity: 0.7;
    font-size: 12px;
  }

  @media (max-width: 500px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
