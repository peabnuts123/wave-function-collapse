import Canvas, { COLOR, DEBUG_COLOR } from './canvas';
import { Grid, NeighbourDirection, Rule, WaveFunctionSolver } from './wavefunction';
import { generateRules, getAllWorldTiles, WorldTile, WorldTileNeighbourManifestEntry } from './world';

const TERRAIN = {
  LAND: COLOR.GreenBright,
  BEACH: COLOR.Yellow,
  SEA: COLOR.BlueBright,
};

// const COLOUR_SOURCE = COLOR;

// const GRID_VALUES = Object.keys(COLOUR_SOURCE).map((k) => COLOUR_SOURCE[k as keyof typeof COLOUR_SOURCE]);
// const canvas = new Canvas(5, 5, GRID_VALUES[0]);


// console.log(`CANVAS`);
// console.log(canvas.render());

// console.log(`GRID_VALUES`, GRID_VALUES.map((f) => f('  ')).join(''));

// const grid = new Grid(canvas.width, canvas.height, GRID_VALUES);

// console.log(`GRID (INITIAL)`);
// console.log(grid.toString((pixel) => pixel('  ')));

// const solver = new WaveFunctionSolver([
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.FOUR, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.FOUR, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.TWO, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.TWO, NeighbourDirection.EAST),

//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.ONE, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.ONE, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.THREE, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.THREE, NeighbourDirection.EAST),

//   // new Rule(DEBUG_COLOR.THREE, DEBUG_COLOR.TWO, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.THREE, DEBUG_COLOR.TWO, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.THREE, DEBUG_COLOR.FOUR, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.THREE, DEBUG_COLOR.FOUR, NeighbourDirection.EAST),

//   // new Rule(DEBUG_COLOR.FOUR, DEBUG_COLOR.THREE, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.FOUR, DEBUG_COLOR.THREE, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.FOUR, DEBUG_COLOR.ONE, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.FOUR, DEBUG_COLOR.ONE, NeighbourDirection.EAST),

//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.TWO, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.TWO, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.TWO, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.TWO, NeighbourDirection.EAST),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.ONE, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.ONE, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.ONE, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.ONE, DEBUG_COLOR.ONE, NeighbourDirection.EAST),

//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.ONE, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.ONE, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.ONE, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.ONE, NeighbourDirection.EAST),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.TWO, NeighbourDirection.NORTH),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.TWO, NeighbourDirection.WEST),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.TWO, NeighbourDirection.SOUTH),
//   // new Rule(DEBUG_COLOR.TWO, DEBUG_COLOR.TWO, NeighbourDirection.EAST),

//   // new Rule(COLOR.GreenBright, COLOR.BlueBright, NeighbourDirection.NORTH),
//   // new Rule(COLOR.GreenBright, COLOR.BlueBright, NeighbourDirection.WEST),
//   // new Rule(COLOR.GreenBright, COLOR.BlueBright, NeighbourDirection.SOUTH),
//   // new Rule(COLOR.GreenBright, COLOR.BlueBright, NeighbourDirection.EAST),
//   // new Rule(COLOR.GreenBright, COLOR.GreenBright, NeighbourDirection.NORTH),
//   // new Rule(COLOR.GreenBright, COLOR.GreenBright, NeighbourDirection.WEST),
//   // new Rule(COLOR.GreenBright, COLOR.GreenBright, NeighbourDirection.SOUTH),
//   // new Rule(COLOR.GreenBright, COLOR.GreenBright, NeighbourDirection.EAST),

//   // new Rule(COLOR.BlueBright, COLOR.GreenBright, NeighbourDirection.NORTH),
//   // new Rule(COLOR.BlueBright, COLOR.GreenBright, NeighbourDirection.WEST),
//   // new Rule(COLOR.BlueBright, COLOR.GreenBright, NeighbourDirection.SOUTH),
//   // new Rule(COLOR.BlueBright, COLOR.GreenBright, NeighbourDirection.EAST),
//   // new Rule(COLOR.BlueBright, COLOR.BlueBright, NeighbourDirection.NORTH),
//   // new Rule(COLOR.BlueBright, COLOR.BlueBright, NeighbourDirection.WEST),
//   // new Rule(COLOR.BlueBright, COLOR.BlueBright, NeighbourDirection.SOUTH),
//   // new Rule(COLOR.BlueBright, COLOR.BlueBright, NeighbourDirection.EAST),

//   // new Rule(COLOR.GreenBright, COLOR.RedBright, NeighbourDirection.EAST),
//   // new Rule(COLOR.RedBright, COLOR.GreenBright, NeighbourDirection.WEST),
// ]);

// solver.collapse(2, 2, grid, DEBUG_COLOR.TWO);
// solver.collapse(2, 2, grid, COLOR.GreenBright);

// console.log(`GRID (UPDATED)`);
// console.log(grid.toString((pixel) => pixel('  ')));

const WORLD_TILES = {
  // LAND: new WorldTile("Land", 2, 2, [
  //   [COLOR.GreenBright, COLOR.GreenBright],
  //   [COLOR.GreenBright, COLOR.GreenBright],
  // ]),

  // SEA: new WorldTile("Sea", 2, 2, [
  //   [COLOR.BlueBright, COLOR.BlueBright],
  //   [COLOR.BlueBright, COLOR.BlueBright],
  // ]),

  // COAST: new WorldTile("Coast", 2, 2, [
  //   [COLOR.GreenBright, COLOR.BlueBright],
  //   [COLOR.GreenBright, COLOR.BlueBright],
  // ]),

  // // CONVEX CORNERS
  // LAND_CONVEX_CORNER_TOP_RIGHT: new WorldTile("LAND_CONVEX_CORNER_TOP_RIGHT", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.SEA],
  //   [TERRAIN.BEACH, TERRAIN.SEA],
  // ]),
  // LAND_CONVEX_CORNER_BOTTOM_RIGHT: new WorldTile("LAND_CONVEX_CORNER_BOTTOM_RIGHT", 2, 2, [
  //   [TERRAIN.BEACH, TERRAIN.SEA],
  //   [TERRAIN.SEA, TERRAIN.SEA],
  // ]),
  // LAND_CONVEX_CORNER_BOTTOM_LEFT: new WorldTile("LAND_CONVEX_CORNER_BOTTOM_LEFT", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.BEACH],
  //   [TERRAIN.SEA, TERRAIN.SEA],
  // ]),
  // LAND_CONVEX_CORNER_TOP_LEFT: new WorldTile("LAND_CONVEX_CORNER_TOP_LEFT", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.SEA],
  //   [TERRAIN.SEA, TERRAIN.BEACH],
  // ]),


  // // CONCAVE CORNERS
  // LAND_CONCAVE_CORNER_TOP_RIGHT: new WorldTile("LAND_CONCAVE_CORNER_TOP_RIGHT", 2, 2, [
  //   [TERRAIN.BEACH, TERRAIN.SEA],
  //   [TERRAIN.BEACH, TERRAIN.BEACH],
  // ]),
  // LAND_CONCAVE_CORNER_BOTTOM_RIGHT: new WorldTile("LAND_CONCAVE_CORNER_BOTTOM_RIGHT", 2, 2, [
  //   [TERRAIN.BEACH, TERRAIN.BEACH],
  //   [TERRAIN.BEACH, TERRAIN.SEA],
  // ]),
  // LAND_CONCAVE_CORNER_BOTTOM_LEFT: new WorldTile("LAND_CONCAVE_CORNER_BOTTOM_LEFT", 2, 2, [
  //   [TERRAIN.BEACH, TERRAIN.BEACH],
  //   [TERRAIN.SEA, TERRAIN.BEACH],
  // ]),
  // LAND_CONCAVE_CORNER_TOP_LEFT: new WorldTile("LAND_CONCAVE_CORNER_TOP_LEFT", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.BEACH],
  //   [TERRAIN.BEACH, TERRAIN.BEACH],
  // ]),

  // // EDGES
  // LAND_EDGE_TOP: new WorldTile("LAND_EDGE_TOP", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.SEA],
  //   [TERRAIN.BEACH, TERRAIN.BEACH],
  // ]),
  // LAND_EDGE_RIGHT: new WorldTile("LAND_EDGE_RIGHT", 2, 2, [
  //   [TERRAIN.BEACH, TERRAIN.SEA],
  //   [TERRAIN.BEACH, TERRAIN.SEA],
  // ]),
  // LAND_EDGE_BOTTOM: new WorldTile("LAND_EDGE_BOTTOM", 2, 2, [
  //   [TERRAIN.BEACH, TERRAIN.BEACH],
  //   [TERRAIN.SEA, TERRAIN.SEA],
  // ]),
  // LAND_EDGE_LEFT: new WorldTile("LAND_EDGE_LEFT", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.BEACH],
  //   [TERRAIN.SEA, TERRAIN.BEACH],
  // ]),

  // // WHOLE TILES
  // LAND: new WorldTile("LAND", 2, 2, [
  //   [TERRAIN.LAND, TERRAIN.LAND],
  //   [TERRAIN.LAND, TERRAIN.LAND],
  // ]),
  // SEA: new WorldTile("SEA", 2, 2, [
  //   [TERRAIN.SEA, TERRAIN.SEA],
  //   [TERRAIN.SEA, TERRAIN.SEA],
  // ]),
  // CONVEX CORNERS
  LAND_CONVEX_CORNER_TOP_RIGHT: new WorldTile("LAND_CONVEX_CORNER_TOP_RIGHT", 3, 3, [
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
    [TERRAIN.BEACH, TERRAIN.BEACH, TERRAIN.SEA],
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
  ]),
  LAND_CONVEX_CORNER_BOTTOM_RIGHT: new WorldTile("LAND_CONVEX_CORNER_BOTTOM_RIGHT", 3, 3, [
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
    [TERRAIN.BEACH, TERRAIN.BEACH, TERRAIN.SEA],
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
  ]),
  LAND_CONVEX_CORNER_BOTTOM_LEFT: new WorldTile("LAND_CONVEX_CORNER_BOTTOM_LEFT", 3, 3, [
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.BEACH],
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
  ]),
  LAND_CONVEX_CORNER_TOP_LEFT: new WorldTile("LAND_CONVEX_CORNER_TOP_LEFT", 3, 3, [
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.BEACH],
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
  ]),


  // CONCAVE CORNERS
  LAND_CONCAVE_CORNER_TOP_RIGHT: new WorldTile("LAND_CONCAVE_CORNER_TOP_RIGHT", 3, 3, [
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.BEACH],
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
  ]),
  LAND_CONCAVE_CORNER_BOTTOM_RIGHT: new WorldTile("LAND_CONCAVE_CORNER_BOTTOM_RIGHT", 3, 3, [
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.BEACH],
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
  ]),
  LAND_CONCAVE_CORNER_BOTTOM_LEFT: new WorldTile("LAND_CONCAVE_CORNER_BOTTOM_LEFT", 3, 3, [
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
    [TERRAIN.BEACH, TERRAIN.BEACH, TERRAIN.LAND],
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
  ]),
  LAND_CONCAVE_CORNER_TOP_LEFT: new WorldTile("LAND_CONCAVE_CORNER_TOP_LEFT", 3, 3, [
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
    [TERRAIN.BEACH, TERRAIN.BEACH, TERRAIN.LAND],
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
  ]),

  // EDGES
  LAND_EDGE_TOP: new WorldTile("LAND_EDGE_TOP", 3, 3, [
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
    [TERRAIN.BEACH, TERRAIN.BEACH, TERRAIN.BEACH],
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
  ]),
  LAND_EDGE_RIGHT: new WorldTile("LAND_EDGE_RIGHT", 3, 3, [
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
    [TERRAIN.LAND, TERRAIN.BEACH, TERRAIN.SEA],
  ]),
  LAND_EDGE_BOTTOM: new WorldTile("LAND_EDGE_BOTTOM", 3, 3, [
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
    [TERRAIN.BEACH, TERRAIN.BEACH, TERRAIN.BEACH],
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
  ]),
  LAND_EDGE_LEFT: new WorldTile("LAND_EDGE_LEFT", 3, 3, [
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
    [TERRAIN.SEA, TERRAIN.BEACH, TERRAIN.LAND],
  ]),

  // WHOLE TILES
  LAND: new WorldTile("LAND", 3, 3, [
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
    [TERRAIN.LAND, TERRAIN.LAND, TERRAIN.LAND],
  ]),
  SEA: new WorldTile("SEA", 3, 3, [
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
    [TERRAIN.SEA, TERRAIN.SEA, TERRAIN.SEA],
  ]),
};

const WORLD_TILE_NEIGHBOURS = generateWorldTileNeighbours(WORLD_TILES);

const grid = new Grid(15, 15, getAllWorldTiles(WORLD_TILES));
const solver = new WaveFunctionSolver(generateRules(WORLD_TILE_NEIGHBOURS));

let intervalCount = 0;

// MAIN LOOP
const intervalKey = setInterval(() => {
  printGrid(grid, `${intervalCount}`);
  renderGrid(grid);

  const lowestEntropyTile = solver.getLowestEntropyTile(grid);
  solver.collapse(lowestEntropyTile.x, lowestEntropyTile.y, grid);

  intervalCount++;
  // if (intervalCount >= 50) {
  //   console.error(`Exiting after too much processing`);
  //   clearInterval(intervalKey);
  // }

  if (grid.isResolved()) {
    console.log(`Finished processing`);

    printGrid(grid, "Resolved");

    renderGrid(grid);

    clearInterval(intervalKey);
  }
}, 70);

function printGrid(grid: Grid<WorldTile>, label: string): void {
  return;
  /* NO-OP */
  console.log(`GRID (${label})`);
  console.log(grid.toString((worldTile) => worldTile.name));
}

function renderGrid(grid: Grid<WorldTile>): void {
  // @NOTE assumption that all world tiles are the same size
  const TILE_WIDTH = WORLD_TILE_NEIGHBOURS[0].tile.width;
  const TILE_HEIGHT = WORLD_TILE_NEIGHBOURS[0].tile.height;
  const canvas = new Canvas(grid.width * TILE_WIDTH, grid.height * TILE_HEIGHT);
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      if (grid.getTile(x, y).isResolved()) {
        const canvasX = x * TILE_WIDTH;
        const canvasY = y * TILE_HEIGHT;
        renderWorldTileToCanvas(canvasX, canvasY, grid.getTile(x, y).resolvedValue()!, canvas);
      }
    }
  }
  console.log(canvas.render());
}

function renderWorldTileToCanvas(x: number, y: number, worldTile: WorldTile, canvas: Canvas): void {
  for (let tileX = 0; tileX < worldTile.width; tileX++) {
    for (let tileY = 0; tileY < worldTile.height; tileY++) {
      const canvasX = x + tileX;
      const canvasY = y + tileY;

      canvas.setPixel(canvasX, canvasY, worldTile.getPixel(tileX, tileY));
    }
  }
}

function generateWorldTileNeighbours(worldTileManifest: Record<string, WorldTile>): WorldTileNeighbourManifestEntry[] {
  const allWorldTiles = getAllWorldTiles(worldTileManifest);

  return allWorldTiles.map((worldTile) => ({
    tile: worldTile,
    // Find all tiles that fit when placed NORTH, etc.
    north: allWorldTiles.filter((neighbourWorldTile) => worldTile.fitsWithTile(neighbourWorldTile, NeighbourDirection.NORTH)),
    east: allWorldTiles.filter((neighbourWorldTile) => worldTile.fitsWithTile(neighbourWorldTile, NeighbourDirection.EAST)),
    south: allWorldTiles.filter((neighbourWorldTile) => worldTile.fitsWithTile(neighbourWorldTile, NeighbourDirection.SOUTH)),
    west: allWorldTiles.filter((neighbourWorldTile) => worldTile.fitsWithTile(neighbourWorldTile, NeighbourDirection.WEST)),
  }));
}
