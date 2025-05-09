export function createMaze(p, world) {
  const layout = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,1],
    [1,0,1,0,1,0,1,1],
    [1,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1],
  ];
  const tileSize = 100;
  const rows = layout.length;
  const cols = layout[0].length;

  const wallBodies = [];

  for (let row = 0; row < rows; row++) {
  let startCol = null;

  for (let col = 0; col <= cols; col++) {
    const isWall = layout[row][col] === 1;

    if (isWall && startCol === null) {
      startCol = col;
    }

    if ((!isWall || col === cols) && startCol !== null) {
      // End of a wall sequence — create one wide body
      const wallWidth = (col - startCol) * tileSize;
      const x = (startCol + (col - startCol) / 2) * tileSize;
      const y = row * tileSize + tileSize / 2;

      const wall = Matter.Bodies.rectangle(x, y, wallWidth, tileSize, {
        isStatic: true,
      });

      wallBodies.push(wall);
      Matter.World.add(world, wall);

      startCol = null;
    }
  }
}

  return { layout, tileSize, rows, cols, wallBodies };
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
  