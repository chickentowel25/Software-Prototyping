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
        this.load.atlas('player-idle', 'assets/sprites/player-idle.png', 'assets/sprites/player-idle.json')
        this.load.atlas('player-run', 'assets/sprites/player-run.png', 'assets/sprites/player-run.json')
        this.load.atlas('player-jump', 'assets/sprites/player-jump.png', 'assets/sprites/player-jump.json')

        this.load.image('tiles', 'assets/Medieval_tiles_free2.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/dungeon.json')
        this.load.image('gem', 'assets/gem.png')
        this.load.audio('gem-sound', 'assets/gem.wav');
    }

    showWinOverlay() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.innerHTML = `
      <h1 style="color:white; font-family:'Press Start 2P', cursive;">You Win</h1>
      <button style="margin-top:20px; padding:10px 20px; font-family:'Press Start 2P'; font-size:12px;">Play Again</button>
    `;

        document.body.appendChild(overlay);

        overlay.querySelector('button').addEventListener('click', () => {
            overlay.remove();
            this.scene.restart(); // restart the Phaser scene
        });
    }

    create() {
        this._createPlayerAnimation();

        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('Medieval_tiles_free2', 'tiles')

        const background = map.createLayer('background', tileset)
        const winzone = map.createLayer('winzone', tileset)
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
            [175, 210],
            [600, 296],
            [400, 396],
            [200, 546],
            [550, 581]
        ];
        gemPositions.forEach(([x, y]) => this._spawnGem(x, y));
        this.gemCount = 0;

        this.winZoneTiles = [];
        winzone.forEachTile(tile => {
            if (tile.index !== -1 && tile.index !== 0) {
                this.winZoneTiles.push(tile);
            }
        });

        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;

                const a = bodyA.gameObject;
                const b = bodyB.gameObject;

                if (a && typeof a.getData === 'function' && a.getData('type') === 'gem') {
                    setTimeout(() => a.destroy(), 0);
                    this.sound.play('gem-sound');
                    this.gemCount += 1;
                }

                if (b && typeof b.getData === 'function' && b.getData('type') === 'gem') {
                    setTimeout(() => b.destroy(), 0);
                    this.sound.play('gem-sound');
                    this.gemCount += 1;
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

        // @ts-ignore
        if (typeof window.setGemCount == 'function') {
            // @ts-ignore
            window.setGemCount(this.gemCount);
        }

        if (!this.hasWon) {
            this.winZoneTiles.forEach(tile => {
                const tileWorldX = tile.getCenterX();
                const tileWorldY = tile.getCenterY();

                const dist = Phaser.Math.Distance.Between(
                    this._player.x, this._player.y,
                    tileWorldX, tileWorldY
                );

                if (dist < 10) {
                    this.hasWon = true;

                    // Delay win screen by 0.5s
                    this.time.delayedCall(500, () => {
                        this.showWinOverlay();
                    });
                }
            });
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