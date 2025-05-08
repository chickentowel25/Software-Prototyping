<script>
  import { onMount } from 'svelte';
  import { setup, draw } from '../game/gameLoop.js';
  import { setDirection } from '../game/player.js';

  let p5Instance;

  onMount(() => {
    const sketch = (p) => {
      p.setup = () => {
        console.log("🧱 p.setup called");

        
        p.createCanvas(800, 600);
        setup(p);
      };

      p.draw = () => {
        draw(p);
      };

      p.keyPressed = () => {
        if (p.key === 'ArrowLeft') setDirection({ x: -1, y: 0 });
        if (p.key === 'ArrowRight') setDirection({ x: 1, y: 0 });
        if (p.key === 'ArrowUp') setDirection({ x: 0, y: -1 });
      };

      p.keyReleased = () => {
        setDirection({ x: 0, y: 0 });
      };
    };

    p5Instance = new window.p5(sketch, document.getElementById('p5-container'));
  });
</script>

<div id="p5-container" style="border: 2px solid red;"></div>
