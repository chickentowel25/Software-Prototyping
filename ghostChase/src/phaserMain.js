import Phaser from 'phaser'
import Game from './phaserGame.js'


export function startPhaserGame(container) {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 700,
        parent: container,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 200 },
                debug: true
            }
        },
        scene: [Game]
    };

    new Phaser.Game(config);
}

// export function preload() {
//     this.load.atlas
//  }

// export function create() { }

// export function update() { }