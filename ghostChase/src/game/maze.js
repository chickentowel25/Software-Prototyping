export function createMazeFromTiled(p, world, mapData) {
  const tileSize = mapData.tilewidth;
  const layer = mapData.layers.find(l => l.name === 'platforms');

  if (!layer || !layer.data) return;

  const cols = layer.width;
  const rows = layer.height;
  const data = layer.data;

  const wallBodies = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      const gid = data[index];
      if (gid === 0) continue;

      const x = col * tileSize + tileSize / 2;
      const y = row * tileSize + 4; // draw near the top

      const body = Matter.Bodies.rectangle(x, y, tileSize, 8, {
        isStatic: true,
        label: 'oneway-platform'
      });

      Matter.World.add(world, body);
      wallBodies.push(body);
    }
  }

  return {
    wallBodies,
    tileSize,
    rows,
    cols
  };
}




export function isWallAt(maze, x, y) {
  const col = Math.floor(x / maze.tileSize);
  const row = Math.floor(y / maze.tileSize);
  return maze.layout[row]?.[col] === 1;
}
