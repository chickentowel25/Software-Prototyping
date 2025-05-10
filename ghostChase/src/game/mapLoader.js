export let mapData;
export let tilesetImg;

export function preloadMap(p) {
  mapData = p.loadJSON('/assets/dungeon.json');
  tilesetImg = p.loadImage('/assets/dungeon-tiles.png');
}
