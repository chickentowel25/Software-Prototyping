import { runFrames, jumpFrames, SpriteAnimation } from './animations.js';

let runAnim, jumpAnim;
let playerBody;

export function setupPlayer(p, world) {
  // Create Matter.js body
  playerBody = Matter.Bodies.rectangle(200, 300, 40, 80, {
    restitution: 0.1,
    friction: 0.1,
  });
  Matter.World.add(world, playerBody);

  // Set up animations
  runAnim = new SpriteAnimation(runFrames, 4);
  jumpAnim = new SpriteAnimation(jumpFrames, 4);

  return playerBody;
}

export function updatePlayer(p, body) {
  if (!body?.velocity) return;

  if (Math.abs(body.velocity.y) > 0.1) {
    jumpAnim.update();
  } else if (Math.abs(body.velocity.x) > 0.1) {
    runAnim.update();
  }
}

export function drawPlayer(p, body) {
  if (!body?.position) return;

  const pos = body.position;
  p.push();
  p.translate(pos.x, pos.y);

  if (Math.abs(body.velocity.y) > 0.1) {
    jumpAnim.draw(p, -64, -64);
  } else {
    runAnim.draw(p, -64, -64);
  }

  p.pop();
}
