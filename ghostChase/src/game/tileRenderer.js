export function drawTileLayer(p, map, img, layerName) {
  const layer = map.layers.find(l => l.name === layerName);
  if (!layer || layer.type !== 'tilelayer') return;

  const tileWidth = map.tilewidth;
  const tileHeight = map.tileheight;
  const cols = map.tilesets[0].columns;
  const firstGid = map.tilesets[0].firstgid;

  for (let row = 0; row < layer.height; row++) {
    for (let col = 0; col < layer.width; col++) {
      const index = row * layer.width + col;
      const gid = layer.data[index];
      if (gid === 0) continue;

      const tileIndex = gid - firstGid;

      const sx = (tileIndex % cols) * tileWidth;
      const sy = Math.floor(tileIndex / cols) * tileHeight;
      const dx = col * tileWidth;
      const dy = row * tileHeight;

      p.image(img, dx, dy, tileWidth, tileHeight, sx, sy, tileWidth, tileHeight);
    }
  }
}
