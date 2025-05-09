export function parseAsciiMap(asciiMap) {
  return asciiMap.map(row => row.split('').map(char => (char === '#' ? 1 : 0)));
}

export function createMaze(p, world) {
  const asciiMap = [
    "########  ###",
    "#           #",
    "#     ###   #",
    "# ##       ##",
    "###         #",
    "#     ####  #",
    "# ##    #####",
    "#           #",
    "#    ##     #",
    "#  ###  #####",
    "#         ###",
    "#############"
  ];

  const layout = parseAsciiMap(asciiMap);
  const tileSize = 50;
  const wallBodies = [];

  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[0].length; col++) {
      if (layout[row][col] === 1) {
        const x = col * tileSize + tileSize / 2;
        const y = row * tileSize + tileSize / 2;
        const wall = Matter.Bodies.rectangle(x, y, tileSize, tileSize, { isStatic: true });
        wallBodies.push(wall);
        Matter.World.add(world, wall);
      }
    }
  }

  return { layout, tileSize, rows: layout.length, cols: layout[0].length, wallBodies };
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
