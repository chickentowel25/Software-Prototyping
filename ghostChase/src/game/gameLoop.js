import { setupPlayer, updatePlayer, drawPlayer } from './player.js';
import { createMaze, drawMaze } from './maze.js';
import { preloadAnimations, setupAnimations } from './animations.js';

let engine, world, maze, playerBody;

export function preload(p) {
  preloadAnimations(p);
}

export function setup(p) {
  setupAnimations(p);

  engine = Matter.Engine.create();  // ✅ create engine first
  world = engine.world;             // ✅ get world next

  maze = createMaze(p, world);      // ✅ then pass world to maze
  playerBody = setupPlayer(p, world);
}

export function draw(p) {
  p.background(30);
  Matter.Engine.update(engine);

  drawMaze(p, maze);
  updatePlayer(p, playerBody);
  drawPlayer(p, playerBody);
}
