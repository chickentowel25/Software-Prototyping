import Phaser from 'phaser'
import Game from './phaserGame.js'


export function startPhaserGame(container) {
    const config = {
        type: Phaser.AUTO,
        parent: container,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 768,
            height: 768
        },
        physics: {
            default: 'matter',
            matter: {
                debug: false
            }
        },
        scene: [Game]
    };

    new Phaser.Game(config);
}
