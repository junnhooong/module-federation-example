<script lang="ts">
  import Dashboard from './components/Dashboard.svelte';
</script>

<main>
  <div class="standalone-app">
    <h1>Svelte Vite Remote - Standalone</h1>
    <p>This remote can run independently or be consumed by the shell</p>
    <Dashboard />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .standalone-app {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  .standalone-app h1 {
    color: #ff3e00;
    margin-bottom: 8px;
  }

  .standalone-app p {
    color: #666;
    margin-bottom: 32px;
  }
</style>
