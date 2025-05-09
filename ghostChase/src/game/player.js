import { runFrames, jumpFrames, SpriteAnimation } from './animations.js';
import { getKeyState } from './controls.js';

let runAnim, jumpAnim;
let playerBody;

export function setupPlayer(p, world) {
  // Create Matter.js body
  playerBody = Matter.Bodies.rectangle(50, 475, 32, 90, {
    restitution: 0.05,
    friction: 0.2,
    frictionAir: 0.02,
  });
  Matter.World.add(world, playerBody);

  // Set up animations
  runAnim = new SpriteAnimation(runFrames, 4);
  jumpAnim = new SpriteAnimation(jumpFrames, 4);

  return playerBody;
}

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
    jumpAnim.draw(p, -16, -48, 90, 90);
  } else {
    runAnim.draw(p, -16, -48, 90, 90); // Draw sprite at 32x48
  }

  p.pop();
}

