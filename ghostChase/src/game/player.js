import { isWallAt } from './maze.js';

let direction = { x: 0, y: 0 };
let speed = 2;
let playerSprite;

export function createPlayer(p) {
  console.log("player created");

  playerSprite = new p.Sprite(100, 100, 30, 30);
  playerSprite.color = 'yellow';
  playerSprite.collider = 'dynamic';
  return playerSprite;
}

export function updatePlayer(p, player, maze) {
  // Set velocity based on direction
  player.vel.x = direction.x * speed;
  player.vel.y = direction.y * speed;


  // You can add maze collision here if needed
}

export function drawPlayer(p, playerSprite) {
    if (playerSprite && typeof playerSprite.draw === 'function') {
      playerSprite.draw(); // required to actually render it
    } else {
      console.warn("Player not drawable", playerSprite);
    }
  }
  

export function setDirection(dir) {
  direction = dir;
}
