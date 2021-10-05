import chalk from 'chalk';

function debugColor(n: number): Pixel {
  return () => `${n}`;
}

export const COLOR = {
  White: chalk.bgWhite,
  Black: chalk.bgBlack,
  Red: chalk.bgRed,
  Green: chalk.bgGreen,
  Yellow: chalk.bgYellow,
  Blue: chalk.bgBlue,
  Magenta: chalk.bgMagenta,
  Cyan: chalk.bgCyan,
  Grey: chalk.bgGrey,
  RedBright: chalk.bgRedBright,
  GreenBright: chalk.bgGreenBright,
  YellowBright: chalk.bgYellowBright,
  BlueBright: chalk.bgBlueBright,
  MagentaBright: chalk.bgMagentaBright,
  CyanBright: chalk.bgCyanBright,
  WhiteBright: chalk.bgWhiteBright,
};
export const DEBUG_COLOR = {
  ONE: debugColor(1),
  TWO: debugColor(2),
  THREE: debugColor(3),
  FOUR: debugColor(4),
};

export type Pixel = (str: string) => string;

class Canvas {
  public readonly width: number;
  public readonly height: number;
  private data: Pixel[][];

  public constructor(width: number, height: number, bgColor: Pixel = COLOR.White) {
    this.width = width;
    this.height = height;
    this.data = new Array(height + 1).join().split('').map(() =>
      new Array(width + 1).join().split('').map(() => bgColor),
    );
  }

  public getPixel(x: number, y: number): Pixel {
    return this.data[y][x];
  }

  public setPixel(x: number, y: number, p: Pixel): void {
    this.data[y][x] = p;
  }

  public render(): string {
    return this.data.reduce((output: string, row: Pixel[]) => {
      return output + row.map((pixel) => pixel('  ')).join('') + '\n';
    }, '');
  }
}

export default Canvas;
