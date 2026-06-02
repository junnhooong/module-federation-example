<script lang="ts">
  let message = 'Hello from Svelte!';
  let isFlipped = false;

  function flip() {
    isFlipped = !isFlipped;
  }

  function updateMessage() {
    const messages = [
      'Hello from Svelte!',
      'Svelte is awesome! 🎉',
      'Module Federation rocks! 🚀',
      'Building micro-frontends! ⚡'
    ];
    message = messages[Math.floor(Math.random() * messages.length)];
  }
</script>

<div class="svelte-card-container">
  <div class="card" class:flipped={isFlipped}>
    <div class="card-front">
      <h3>Svelte Card</h3>
      <p class="message">{message}</p>
      <div class="button-group">
        <button class="svelte-button" on:click={flip}>
          Flip Card
        </button>
        <button class="svelte-button secondary" on:click={updateMessage}>
          Change Message
        </button>
      </div>
    </div>
    <div class="card-back">
      <h3>Card Back</h3>
      <p>This is a flippable card component</p>
      <button class="svelte-button" on:click={flip}>
        Flip Back
      </button>
    </div>
  </div>
  <p class="framework-badge">🔥 Built with Svelte</p>
</div>

<style>
  .svelte-card-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 320px;
    height: 250px;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(255, 62, 0, 0.2);
  }

  .card-front {
    background: linear-gradient(135deg, #ff3e00 0%, #ff8a00 100%);
    color: white;
  }

  .card-back {
    background: linear-gradient(135deg, #ff8a00 0%, #ff3e00 100%);
    color: white;
    transform: rotateY(180deg);
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  .message {
    font-size: 1.1rem;
    text-align: center;
    margin: 0;
  }

  .button-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .svelte-button {
    background: white;
    color: #ff3e00;
    border: 2px solid white;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .svelte-button:hover {
    background: transparent;
    color: white;
    transform: translateY(-2px);
  }

  .svelte-button.secondary {
    background: transparent;
    color: white;
  }

  .svelte-button.secondary:hover {
    background: white;
    color: #ff3e00;
  }

  .framework-badge {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }
</style>
