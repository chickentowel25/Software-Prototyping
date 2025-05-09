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

  // ✅ Shift sprite UP so feet rest on tile, not center overlap
  if (Math.abs(body.velocity.y) > 0.1) {
    jumpAnim.draw(p, -64, -128); // <- Y is now -128
  } else {
    runAnim.draw(p, -64, -128);
  }

  // ✅ Optional debug overlay (to match body and sprite)
  p.stroke(255,0,0);
  p.noFill();
  p.rectMode(p.CENTER);
  p.rect(0, -32, 40, 80); // match your Matter body dimensions

  p.pop();
}

