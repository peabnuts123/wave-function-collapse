import { Pixel } from './canvas';
import { NeighbourDirection, Rule } from './wavefunction';

export interface WorldTileNeighbourManifestEntry {
  tile: WorldTile;
  north: WorldTile[];
  east: WorldTile[];
  south: WorldTile[];
  west: WorldTile[];
}

export class WorldTile {
  public readonly name: string;
  public readonly width: number;
  public readonly height: number;

  private readonly pixelData: Pixel[][];

  public constructor(name: string, width: number, height: number, pixelData: Pixel[][]) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.pixelData = pixelData;
  }

  public getPixel(x: number, y: number): Pixel {
    return this.pixelData[y][x];
  }

  /**
   * Whether this tile fits against `other` in `direction` (e.g. SOUTH means `other` is below this tile)
   * @param other The tile to compare
   * @param direction The direction of the tile
   */
  public fitsWithTile(other: WorldTile, direction: NeighbourDirection): boolean {
    switch (direction) {
      case NeighbourDirection.NORTH:
        // Compare self top row with other bottom row
        for (let x = 0; x < this.width; x++) {
          if (this.pixelData[0][x] !== other.pixelData[other.height - 1][x]) {
            return false;
          }
        }
        return true;
      case NeighbourDirection.EAST:
        // Compare self right column with other left column
        for (let y = 0; y < this.height; y++) {
          if (this.pixelData[y][this.width - 1] !== other.pixelData[y][0]) {
            return false;
          }
        }
        return true;
      case NeighbourDirection.SOUTH:
        // Compare self bottom row with other top row
        for (let x = 0; x < this.width; x++) {
          if (this.pixelData[this.height - 1][x] !== other.pixelData[0][x]) {
            return false;
          }
        }
        return true;
      case NeighbourDirection.WEST:
        // Compare self left column with other right column
        for (let y = 0; y < this.height; y++) {
          if (this.pixelData[y][0] !== other.pixelData[y][other.width - 1]) {
            return false;
          }
        }
        return true;
    }
  }
}

export function getAllWorldTiles(worldTileManifest: Record<string, WorldTile>): WorldTile[] {
  return Object.keys(worldTileManifest).map((key) => worldTileManifest[key]);
}

export function generateRules(neighbourManifest: WorldTileNeighbourManifestEntry[]): Rule<WorldTile>[] {
  const allRules: Rule<WorldTile>[] = [];

  neighbourManifest.forEach((manifest) => {
    allRules.push(...manifest.north.map((neighbourTile) => new Rule(manifest.tile, neighbourTile, NeighbourDirection.NORTH)));
    allRules.push(...manifest.east.map((neighbourTile) => new Rule(manifest.tile, neighbourTile, NeighbourDirection.EAST)));
    allRules.push(...manifest.south.map((neighbourTile) => new Rule(manifest.tile, neighbourTile, NeighbourDirection.SOUTH)));
    allRules.push(...manifest.west.map((neighbourTile) => new Rule(manifest.tile, neighbourTile, NeighbourDirection.WEST)));
  });

  return allRules;
}
