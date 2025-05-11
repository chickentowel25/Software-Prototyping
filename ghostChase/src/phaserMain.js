import Phaser from 'phaser'
import Game from './phaserGame.js'


export function startPhaserGame(container) {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 700,
        parent: container,
        physics: {
            default: 'matter',
            matter: {
                debug: true
            }
        },
        scene: [Game]
    };

    new Phaser.Game(config);
}
