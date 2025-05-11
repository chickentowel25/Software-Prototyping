import { tilesetImg } from "./game/mapLoader"

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
        this._cursors = null;
        this._player = null;
        this._isTouchingGround = false;
    }

    init() {
        this._cursors = this.input.keyboard.createCursorKeys();
    }

    preload() {
        this.load.atlas('player-run', 'assets/player-run.png', 'assets/player-run.json')
        this.load.atlas('player-jump', 'assets/player-jump.png', 'assets/player-jump.json')
        this.load.atlas('player-idle', 'assets/player-idle.png', 'assets/player-idle.json')


        this.load.image('tiles', 'assets/Medieval_tiles_free2.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/dungeon.json')
        this.load.image('gem', 'assets/gem.png')
    }

    create() {
        this._createPlayerAnimation();

        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('Medieval_tiles_free2', 'tiles')

        const background = map.createLayer('background', tileset)
        const lighting = map.createLayer('lighting', tileset)

        const wall = map.createLayer('walls', tileset)
        wall.setCollisionByProperty({ collides: true })

        const ground = map.createLayer('platforms', tileset)
        ground.setCollisionByProperty({ collides: true })

        this.matter.world.convertTilemapLayer(wall)
        this.matter.world.convertTilemapLayer(ground)

        const { width, height } = this.scale

        this._player = this.matter.add.sprite(width * 0.2, height * 0.8, 'player-idle')
            .play('player-idle')
            .setFixedRotation()
            .setFriction(0)
        this._player.setOnCollide((data) => {
            this._isTouchingGround = true;
        })


        const gemPositions = [
            [150, 150],
            [600, 200],
            [400, 300],
            [200, 450],
            [550, 485]
        ];

        gemPositions.forEach(([x, y]) => this._spawnGem(x, y));


        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;

                const a = bodyA.gameObject;
                const b = bodyB.gameObject;

                if (a && typeof a.getData === 'function' && a.getData('type') === 'gem') {
                    setTimeout(() => a.destroy(), 0);
                }

                if (b && typeof b.getData === 'function' && b.getData('type') === 'gem') {
                    setTimeout(() => b.destroy(), 0);
                }
            });
        });



        this.input.keyboard.enabled = true;
        // Ensure focus (from Svelte to Phaser)
        this.input.keyboard.on('keydown', () => {
            console.log('key down detected');
        });

    }

    update() {
        if (!this._player) return;

        const speed = 5;
        if (this._cursors.left.isDown) {
            this._player.flipX = true;
            this._player.setVelocityX(-speed);
            this._player.play('player-run', true);
        } else if (this._cursors.right.isDown) {
            this._player.flipX = false;
            this._player.setVelocityX(speed);
            this._player.play('player-run', true);
        } else {
            this._player.setVelocityX(0);
            this._player.play('player-idle', true)
        }

        if (this._cursors.up.isDown && this._isTouchingGround) { // jump only when touching ground
            this._player.setVelocityY(-10);
            this._isTouchingGround = false;
            this._player.play('player-jump', true);
        }
    }

    _createPlayerAnimation() {
        this.anims.create({
            key: 'player-run',
            frameRate: 10,
            frames: this.anims.generateFrameNames('player-run', {
                start: 1,
                end: 8,
                suffix: '.png'
            }),
            repeat: -1
        })

        this.anims.create({
            key: 'player-jump',
            frameRate: 10,
            frames: this.anims.generateFrameNames('player-jump', {
                start: 1,
                end: 8,
                suffix: '.png'
            }),
            repeat: -1
        })

        this.anims.create({
            key: 'player-idle',
            frameRate: 10,
            frames: this.anims.generateFrameNames('player-idle', {
                start: 1,
                end: 8,
                suffix: '.png'
            }),
            repeat: -1
        })
    }

    _spawnGem(x, y) {
        const gem = this.matter.add.sprite(x, y, 'gem', undefined, {
            isStatic: true,
            isSensor: true
        });

        gem.setData('type', 'gem');
    }

}