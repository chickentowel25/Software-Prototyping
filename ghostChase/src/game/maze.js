export function createMaze(p) {
    // Each tile is either 0 (empty) or 1 (wall)
    const layout = [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,1],
      [1,0,1,0,1,0,1,1],
      [1,0,1,0,0,0,0,1],
      [1,1,1,1,1,1,1,1],
    ];
    const tileSize = 50;
  
    return { layout, tileSize, rows: layout.length, cols: layout[0].length };
  }
  
  export function drawMaze(p, maze) {
    p.noStroke();
    p.fill(80);
  
    for (let row = 0; row < maze.rows; row++) {
      for (let col = 0; col < maze.cols; col++) {
        if (maze.layout[row][col] === 1) {
          p.rect(col * maze.tileSize, row * maze.tileSize, maze.tileSize, maze.tileSize);
        }
      }
    }
  }
  
  export function isWallAt(maze, x, y) {
    const col = Math.floor(x / maze.tileSize);
    const row = Math.floor(y / maze.tileSize);
    return maze.layout[row]?.[col] === 1;
  }
  