<script>
  import { onMount } from 'svelte';
  import { setup, draw, preload } from '../game/gameLoop.js';

  let p5Instance;


  onMount(() => {
    const sketch = (p) => {
      p.preload = () => {
        console.log("🎬 preload called");
        preload(p); // Load sprite sheets here
      };

      p.setup = () => {
        console.log("🧱 setup called");
        p.createCanvas(800, 600);
        setup(p);
      };

      p.draw = () => {
        draw(p);
      };

    };

    //@ts-ignore
    p5Instance = new window.p5(sketch, document.getElementById('p5-container'));
  });
</script>

<div id="p5-container" style="border: 2px solid red;"></div>
