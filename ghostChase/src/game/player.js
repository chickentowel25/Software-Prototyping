import { runFrames, jumpFrames, SpriteAnimation } from './animations.js';
import { getKeyState } from './controls.js';

let runAnim, jumpAnim;
let playerBody;

export function setupPlayer(p, world, tileSize) {
  const spawnCol = 2;
  const spawnRow = 11;

  const startX = spawnCol * tileSize + tileSize / 2;
  const startY = spawnRow * tileSize + tileSize / 2;

  playerBody = Matter.Bodies.rectangle(startX, startY, 32, 90, {
    restitution: 0.05,
    friction: 0.2,
    frictionAir: 0.02,
    label: 'player'
  });

  Matter.World.add(world, playerBody);

  // Set up animations
  runAnim = new SpriteAnimation(runFrames, 4);
  jumpAnim = new SpriteAnimation(jumpFrames, 4);

  return playerBody;
}

let frameCount = 0;

export function updatePlayer(p, body) {
  if (!body?.velocity) return;

  const keys = getKeyState(); // get live state
  const force = 0.002;
  const jumpForce = -0.05;

  if (keys.left) {
    Matter.Body.applyForce(body, body.position, { x: -force, y: 0 });
  }
  if (keys.right) {
    Matter.Body.applyForce(body, body.position, { x: force, y: 0 });
  }

  if (keys.up && Math.abs(body.velocity.y) < 0.1) {
    Matter.Body.applyForce(body, body.position, { x: 0, y: jumpForce });
  }

  if (!keys.left && !keys.right) {
    Matter.Body.setVelocity(body, { x: 0, y: body.velocity.y });
  }

  // If player is almost not moving vertically, reset Y velocity to 0
  if (Math.abs(body.velocity.y) < 0.1) {
    Matter.Body.setVelocity(body, { x: body.velocity.x, y: 0 });

  }
  // if (frameCount > 10 && !keys.left && !keys.right) {
  //   Matter.Body.setVelocity(body, { x: 0, y: body.velocity.y });
  // }

  if (keys.up) {
    jumpAnim.update();
  } else if (keys.left || keys.right) {
    runAnim.update();
  }
}

export function drawPlayer(p, body) {
  if (!body?.position) return;

  const pos = body.position;

  p.push();
  p.translate(pos.x, pos.y);

  // Shift sprite UP so feet rest on tile, not center overlap
  if (Math.abs(body.velocity.y) > 0.1) {
    jumpAnim.draw(p, -64, -64, 128, 128);
  } else {
    runAnim.draw(p, -64, -64, 128, 128); // Draw sprite at 32x48
  }

  p.pop();
}

