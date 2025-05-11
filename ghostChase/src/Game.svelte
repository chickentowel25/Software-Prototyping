<script>
  import { onMount } from 'svelte';
  import { startPhaserGame } from './phaserMain.js';

  let container;
  onMount(() => {
    startPhaserGame(container);
  });
</script>

<div bind:this={container} class="phaser-container"></div>

<style>
  .phaser-container {
    width: 800px;
    height: 600px;
    margin: auto;
  }
</style>
