export class SpriteAnimation {
  constructor(frames, frameDelay = 5) {
    this.frames = frames;
    this.frameDelay = frameDelay;
    this.index = 0;
    this.counter = 0;
  }

  update() {
    this.counter++;
    if (this.counter >= this.frameDelay) {
      this.index = (this.index + 1) % this.frames.length;
      this.counter = 0;
    }
  }

  draw(p, x, y, w = 128, h = 128) {
    const frame = this.frames[this.index];
    p.image(frame, x, y, w, h);
  }

  reset() {
    this.index = 0;
    this.counter = 0;
  }
}

export let runFrames = [];
export let jumpFrames = [];

let runSheet, jumpSheet;

export function preloadAnimations(p) {
  runSheet = p.loadImage('/assets/player-run.png');
  jumpSheet = p.loadImage('/assets/player-jump.png');
}

export function setupAnimations(p) {
  for (let i = 0; i < 8; i+= 1) {
    runFrames.push(runSheet.get(i * 128, 0, 128, 128));
    jumpFrames.push(jumpSheet.get(i * 128, 0, 128, 128));
  }
}
