import { setupPlayer, updatePlayer, drawPlayer } from './player.js';
import { createMazeFromTiled } from './maze.js';
import { preloadAnimations, setupAnimations } from './animations.js';
import { preloadMap, mapData, tilesetImg } from './mapLoader.js';
import { drawTileLayer } from './tileRenderer.js';



let engine, world, maze, playerBody, map;


export function preload(p) {
  preloadAnimations(p);
  preloadMap(p);

}
export function setup(p) {
  setupAnimations(p);

  engine = Matter.Engine.create();  // create engine first
  world = engine.world;             // get world next

  if (mapData) {
    maze = createMazeFromTiled(p, world, mapData);
  } else {
    console.error("❌ mapData is still undefined in setup()");
  }      // pass world to maze
  playerBody = setupPlayer(p, world, maze.tileSize);

}

export function draw(p) {
  p.background(30);
  Matter.Engine.update(engine);

  updatePlayer(p, playerBody);

  drawTileLayer(p, mapData, tilesetImg, 'background-outside');
  drawTileLayer(p, mapData, tilesetImg, 'background-bricks');
  
  drawTileLayer(p, mapData, tilesetImg, 'background-lighting');
  drawTileLayer(p, mapData, tilesetImg, 'platforms');
  
  drawPlayer(p, playerBody);

}
