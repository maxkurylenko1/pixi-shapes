import { Application, Graphics } from 'pixi.js';
import { AREA_WIDTH, AREA_HEIGHT } from '../utils/constants';

export class GameView {
  readonly app: Application;
  private areaGraphics!: Graphics;

  constructor(app: Application) {
    this.app = app;
    this.drawGenerationArea();
  }

  private drawGenerationArea(): void {
    this.areaGraphics = new Graphics();
    // Subtle border to mark the generation area
    this.areaGraphics.rect(0, 0, AREA_WIDTH, AREA_HEIGHT).stroke({ color: 0x444466, width: 2 });
    this.app.stage.addChild(this.areaGraphics);
  }

  getAreaBounds(): { x: number; y: number; width: number; height: number } {
    return { x: 0, y: 0, width: AREA_WIDTH, height: AREA_HEIGHT };
  }
}
