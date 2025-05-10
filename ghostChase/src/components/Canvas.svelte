<script>
  import { onMount } from "svelte";
  import { setup, draw, preload } from "../game/gameLoop.js";
  import { setKeyState } from "../game/controls.js";

  let p5Instance;

  onMount(() => {
    const sketch = (p) => {
      p.preload = () => {
        console.log("🎬 preload called");
        preload(p); // Load sprite sheets here
      };

      p.setup = () => {
        console.log("🧱 setup called");
        p.createCanvas(800, 800);
        setup(p);
      };

      p.draw = () => {
        draw(p);
      };

      p.keyPressed = () => {
        if (p.keyCode === p.LEFT_ARROW) setKeyState("left", true);
        if (p.keyCode === p.RIGHT_ARROW) setKeyState("right", true);
        if (p.keyCode === p.UP_ARROW) setKeyState("up", true);
      };

      p.keyReleased = () => {
        if (p.keyCode === p.LEFT_ARROW) setKeyState("left", false);
        if (p.keyCode === p.RIGHT_ARROW) setKeyState("right", false);
        if (p.keyCode === p.UP_ARROW) setKeyState("up", false);
      };
    };

    //@ts-ignore
    p5Instance = new window.p5(sketch, document.getElementById("p5-container"));
  });
</script>

<div id="p5-container" style="border: 2px solid red;"></div>
