export enum NeighbourDirection {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export const ALL_NEIGHBOUR_DIRECTIONS: NeighbourDirection[] = [
  NeighbourDirection.NORTH,
  NeighbourDirection.EAST,
  NeighbourDirection.SOUTH,
  NeighbourDirection.WEST,
];

interface TileNeighbour<T> {
  tile: Tile<T>;
  direction: NeighbourDirection;
}

export class Rule<T> {
  public readonly sourceValue: T;
  public readonly impliedValue: T;
  public readonly direction: NeighbourDirection;

  public constructor(sourceValue: T, impliedValue: T, direction: NeighbourDirection) {
    this.sourceValue = sourceValue;
    this.impliedValue = impliedValue;
    this.direction = direction;
  }
}

export class Tile<T> {
  public readonly x: number;
  public readonly y: number;
  public possibleValues: T[];

  public constructor(x: number, y: number, possibleValues: T[]) {
    this.x = x;
    this.y = y;
    this.possibleValues = possibleValues;
  }

  public resolvedValue(): T | null {
    if (this.numPossibleValues() === 1) {
      return this.possibleValues[0];
    } else {
      return null;
    }
  }

  public isResolved(): boolean {
    return this.numPossibleValues() === 1;
  }

  public isResolvable(): boolean {
    return this.numPossibleValues() > 0;
  }

  public numPossibleValues(): number {
    return this.possibleValues.length;
  }

  public collapse(value?: T): void {
    if (value !== undefined) {
      if (!this.possibleValues.includes(value)) {
        throw new Error("Cannot collapse tile to specified value, it is not a possible value");
      }
    } else {
      value = this.possibleValues[Math.floor(this.numPossibleValues() * Math.random())];
    }

    this.possibleValues = [value];
  }
}

export class Grid<T> {
  public readonly width: number;
  public readonly height: number;
  public tiles: Tile<T>[][];

  public constructor(width: number, height: number, possibleTileValues: T[]) {
    this.tiles = new Array(height + 1).join().split('').map((_, y) =>
      new Array(width + 1).join().split('').map((_, x) => new Tile(x, y, possibleTileValues)),
    );
    this.width = width;
    this.height = height;
  }

  public getTile(x: number, y: number): Tile<T> {
    return this.tiles[y][x];
  }

  public getTileNeighbours(tile: Tile<T>): TileNeighbour<T>[] {
    const { x, y } = tile;
    const neighbours: TileNeighbour<T>[] = [];
    if (x > 0) {
      neighbours.push({
        tile: this.tiles[y][x - 1],
        direction: NeighbourDirection.WEST,
      });
    }
    if (y > 0) {
      neighbours.push({
        tile: this.tiles[y - 1][x],
        direction: NeighbourDirection.NORTH,
      });
    }
    if (x < (this.width - 1)) {
      neighbours.push({
        tile: this.tiles[y][x + 1],
        direction: NeighbourDirection.EAST,
      });
    }
    if (y < (this.height - 1)) {
      neighbours.push({
        tile: this.tiles[y + 1][x],
        direction: NeighbourDirection.SOUTH,
      });
    }

    return neighbours;
  }

  public toString(valuePrinter: (value: T) => string): string {
    return this.tiles.reduce((result, tileRow) => {
      return result + tileRow.map((tile) => tile.possibleValues.map(valuePrinter).join('')).join(' | ') + '\n';
    }, '');
  }

  public canResolve(): boolean {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[y][x].isResolvable()) {
          return false;
        }
      }
    }

    return true;
  }

  public isResolved(): boolean {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[y][x].isResolved()) {
          return false;
        }
      }
    }

    return true;
  }
}

export class WaveFunctionSolver<T> {
  private readonly rules: Rule<T>[];

  public constructor(rules: Rule<T>[]) {
    this.rules = rules;
  }

  public getLowestEntropyTile(grid: Grid<T>): Tile<T> {
    const allUnresolvedTiles = grid.tiles.flat().filter((tile) => !tile.isResolved() && tile.isResolvable());
    const lowestEntropy = allUnresolvedTiles.sort((tileA, tileB) => tileA.numPossibleValues() - tileB.numPossibleValues())[0].numPossibleValues();
    const lowestEntropyTiles = allUnresolvedTiles.filter((tile) => tile.numPossibleValues() === lowestEntropy);

    return lowestEntropyTiles[Math.floor(Math.random() * lowestEntropyTiles.length)];
  }

  public collapse(x: number, y: number, grid: Grid<T>, value?: T): void {
    const tile = grid.getTile(x, y);

    // Already resolved = no-op
    if (tile.isResolved()) return;

    if (!tile.isResolvable()) {
      throw new Error("Cannot resolve tile. It has no possible values remaining");
    } else {
      // Collapse tile
      tile.collapse(value);

      // Propagate changes to grid
      this.propagateUpdate(tile, grid);
    }
  }

  private propagateUpdate(tile: Tile<T>, grid: Grid<T>): void {
    const tilesToProcess: Tile<T>[] = [];
    let currentTile: Tile<T> | undefined = tile;
    while (currentTile !== undefined) {
      /*
        1. For each neighbour
        2. Calculate all possible values for that neighbour
        3. Remove values that are not on this list
        4. Push to stack if updates made
       */
      const neighbours = grid.getTileNeighbours(currentTile);

      ALL_NEIGHBOUR_DIRECTIONS.forEach((neighbourDirection) => {
        const neighbour = neighbours.find((neighbour) => neighbour.direction === neighbourDirection);
        if (!neighbour) return;

        const allNewPossibleNeighbourValues: T[] = [];
        currentTile!.possibleValues.forEach((possibleValue) => {
          // Find rules that apply to the current possible value of `tile` and also the direction of the neighbour being considered
          const relevantRules = this.rules.filter((rule) => rule.direction === neighbour.direction && rule.sourceValue === possibleValue);

          // Get all possible values from this tile for this value in this direction
          relevantRules.forEach((rule) => {
            // Ensure allNewPossibleNeighbourValues does not already contain the rule neighbour value
            if (!(allNewPossibleNeighbourValues.includes(rule.impliedValue))) {
              // Add rule neighbour value if it does not
              allNewPossibleNeighbourValues.push(rule.impliedValue);
            }
          });
        });

        // Keep only possible values that are on the list
        const originalNumPossibleValues = neighbour.tile.numPossibleValues();
        neighbour.tile.possibleValues = neighbour.tile.possibleValues
          .filter((neighbourPossibleValue) => allNewPossibleNeighbourValues.includes(neighbourPossibleValue));

        // Add neighbour to processing list if it was updated
        if (neighbour.tile.numPossibleValues() !== originalNumPossibleValues) {
          tilesToProcess.push(neighbour.tile);
        }
      });

      // Process next tile
      currentTile = tilesToProcess.pop();
    }
  }
}
