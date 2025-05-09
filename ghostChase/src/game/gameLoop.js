import { createMaze, drawMaze } from './maze.js';
import { setupPlayer, updatePlayer, drawPlayer } from './player.js';
import { preloadAnimations, setupAnimations } from './animations.js';

const { Engine, World } = Matter;
export const engine = Engine.create();
const world = engine.world;

let playerBody, maze;

export function preload(p) {
  preloadAnimations(p);
}

export function setup(p) {
  setupAnimations(p);
  maze = createMaze(p);

  // ✅ Pass in world
  playerBody = setupPlayer(p, world);
}

export function draw(p) {
  p.background(30);
  Matter.Engine.update(engine);

  drawMaze(p, maze);
  updatePlayer(p, playerBody);
  drawPlayer(p, playerBody);
}
