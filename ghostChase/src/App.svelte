<script>
  import { onMount } from 'svelte';
  import { startPhaserGame } from './lib/phaserMain.js';

  let container;
  onMount(() => {
    startPhaserGame(container);
  });
</script>

<main>
  <h1>Subterrane Bandit</h1>
  <div bind:this={container} class="phaser-container"></div>
</main>

<style global>
  @import './app.css';
</style>
