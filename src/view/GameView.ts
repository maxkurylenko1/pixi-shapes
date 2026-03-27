import { Application, Graphics, Container } from 'pixi.js';
import { AREA_WIDTH, AREA_HEIGHT } from '../utils/constants';
import { ShapeRenderMap } from './ShapeRenderer';
import { GameModel } from '../model/GameModel';

export class GameView {
  readonly app: Application;
  readonly renderMap: ShapeRenderMap;
  private shapesContainer: Container;

  constructor(app: Application) {
    this.app = app;
    this.drawGenerationArea();

    this.shapesContainer = new Container();
    this.app.stage.addChild(this.shapesContainer);
    this.renderMap = new ShapeRenderMap(this.shapesContainer);
  }

  private drawGenerationArea(): void {
    const border = new Graphics();
    border.rect(0, 0, AREA_WIDTH, AREA_HEIGHT).stroke({ color: 0x444466, width: 2 });
    this.app.stage.addChild(border);
  }

  /** Sync graphics positions from model (call each tick) */
  syncShapes(model: GameModel): void {
    for (const shape of model.getShapes()) {
      if (this.renderMap.has(shape.id)) {
        this.renderMap.update(shape);
      } else {
        this.renderMap.add(shape);
      }
    }
  }

  getAreaBounds(): { x: number; y: number; width: number; height: number } {
    return { x: 0, y: 0, width: AREA_WIDTH, height: AREA_HEIGHT };
  }
}
