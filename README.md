# Subterrane Bandit

## Author Information
- **Name**: Yewon Kim
- **Student ID**: 20253158
- **Email**: yewonkim@kaist.ac.kr

## Project Links
- **Git Repository**: [https://github.com/chickentowel25/Software-Prototyping]
- **YouTube Demo**: [http://bit.ly/3GMg8Di]

## Game Description
- 2D side-scrolling game built with Phaser 3 and Matter.js
- You play as a **bandit** who steals **gems** from an underground dungeon
- Objective: **Collect all gems** and reach the **exit zone** to win
- Uses a tilemap created in Tiled for level layout

## Code Organization
- **phaserGame.js**
  - Main game scene extending `Phaser.Scene`
  - Handles loading assets (`preload`), scene setup (`create`), and game loop (`update`)
- **Main Features**
  - Player movement, animations, jump logic
  - Collision detection using Matter.js
  - Gem collection using sensor bodies
  - Win condition detection with a "win zone"
  - HTML overlay UI for win screen

## Architecture & Patterns
- Folder structure
```plaintext
subterrane-bandit/
├── public/                   
│   └── assets/
│       ├── sprites
|       |   ├── player-idle.json
|       |   ├── player-idle.png
|       |   ├── player-run.json
|       |   ├── player-run.png
|       |   ├── player-jump.json
|       |   └── player-jump.png
│       ├── dungeon.json
│       ├── gem.png
│       └── Medieval_tiles_free2.png
├── src/
│   ├── lib/           
│   │   ├── phaserGame.js 
│   │   └── phaserMain.js 
│   ├── app.css
│   ├── App.svelte
│   ├── main.js
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md       
├── svelte.config.js           
└── vite.config.js
```
- Usage of modules: `preload`, `create`, `update`
- Custom functions:
  - `_createPlayerAnimation()`: defines animations
  - `_spawnGem(x, y)`: places collectible gems
  - `showWinOverlay()`: shows end-of-game screen
- Uses data tags on sprites for identifying collectible types
- Basic collision filtering logic inside `collisionstart` event
- Sprite animations controlled by user input

## Known Issues & Special Features
- **Known Bug**: Player slightly floats at start before physics stabilizes
- **Special Feature**: Win screen created with DOM overlay and restart button

## Acknowledgements
- ChatGPT was used to accelerate development; all final code was written and integrated by me.
- The following YouTube tutorial for Phaser + TypeScript as a reference:  
  [https://www.youtube.com/playlist?list=PLNwtXgWIx3rg3J4XyuDVhjU81dZbJtVAU](https://www.youtube.com/playlist?list=PLNwtXgWIx3rg3J4XyuDVhjU81dZbJtVAU)
- Tiled was used for creating the game scene.
- TexturePacker to create spritesheets and the corresponding sprite JSON arrays.
- The tileset and character sprite assets were brought from: [https://craftpix.net](https://craftpix.net)

## Visuals & Screenshots
- [Gameplay](assets/gameplay_01.png)
- Diagram of code/module structure if needed
