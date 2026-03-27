import { FederatedPointerEvent, Graphics } from 'pixi.js';
import { GameModel } from '../model/GameModel';
import { GameView } from '../view/GameView';
import { createRandomShape } from '../domain/ShapeFactory';

export class InputController {
  private model: GameModel;
  private view: GameView;
  /** Transparent overlay covering the generation area — captures background clicks */
  private hitArea!: Graphics;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.setupAreaClick();
  }

  private setupAreaClick(): void {
    const bounds = this.view.getAreaBounds();

    this.hitArea = new Graphics();
    this.hitArea.rect(0, 0, bounds.width, bounds.height).fill({ color: 0x000000, alpha: 0 });
    this.hitArea.eventMode = 'static';
    this.hitArea.cursor = 'crosshair';
    // Place behind shapes container (index 0 = border, 1 = shapes, so add at index 1)
    this.view.app.stage.addChildAt(this.hitArea, 1);

    this.hitArea.on('pointerdown', (e: FederatedPointerEvent) => {
      const local = this.view.app.stage.toLocal(e.global);
      this.spawnShapeAt(local.x, local.y);
    });
  }

  private spawnShapeAt(x: number, y: number): void {
    const shape = createRandomShape(x, y);
    this.model.addShape(shape);
  }
}
