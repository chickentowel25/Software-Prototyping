import { tilesetImg } from "./game/mapLoader"

export default class Game extends Phaser.Scene {
    constructor() {
        super ('game')
    }

    preload() {
        this.load.atlas('player-run', 'assets/player-run.png', 'assets/player-run.json')
        this.load.image('tiles', 'assets/Medieval_tiles_free2.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/dungeon.json')
    }

    create() {

        const map = this.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('Medieval_tiles_free2', 'tiles')

        map.createLayer('platforms', tileset)


        // const {width, height} = this.scale
        // this.add.image(width * 0.8, height * 0.8, 'player-run')
    }
}