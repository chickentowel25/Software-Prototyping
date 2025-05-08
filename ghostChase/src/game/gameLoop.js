import { createMaze, drawMaze } from './maze.js';
import { createPlayer, updatePlayer, drawPlayer } from './player.js';

let maze;
let player;

export function setup(p) {
  maze = createMaze(p);
  player = createPlayer(p);
}

export function draw(p) {
  p.background(30);

  drawMaze(p, maze);
  updatePlayer(p, player, maze);
  drawPlayer(p, player);
}
