import { FederatedPointerEvent, Graphics } from 'pixi.js';
import { GameModel } from '../model/GameModel';
import { GameView } from '../view/GameView';
import { createRandomShape } from '../domain/ShapeFactory';
import { randomColor } from '../utils/randomColor';

export class InputController {
  private model: GameModel;
  private view: GameView;
  /** Transparent overlay covering the generation area — captures background clicks */
  private hitArea!: Graphics;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.setupAreaClick();
    this.setupShapeClick();
  }

  private setupAreaClick(): void {
    const bounds = this.view.getAreaBounds();

    this.hitArea = new Graphics();
    this.hitArea.rect(0, 0, bounds.width, bounds.height).fill({ color: 0x000000, alpha: 0 });
    this.hitArea.eventMode = 'static';
    this.hitArea.cursor = 'crosshair';
    // Place behind shapes container (index 0 = border, 1 = shapes, insert hitArea at 1)
    this.view.app.stage.addChildAt(this.hitArea, 1);

    this.hitArea.on('pointerdown', (e: FederatedPointerEvent) => {
      const local = this.view.app.stage.toLocal(e.global);
      this.spawnShapeAt(local.x, local.y);
    });
  }

  private setupShapeClick(): void {
    this.view.renderMap.setShapeClickHandler((id: string) => {
      this.handleShapeClick(id);
    });
  }

  private handleShapeClick(shapeId: string): void {
    const shape = this.model.getShapeById(shapeId);
    if (!shape) return;

    const clickedType = shape.type;

    // Remove the clicked shape first
    this.model.removeShape(shapeId);
    this.view.renderMap.remove(shapeId);

    // Recolor all remaining shapes of the same type with a single new color
    const newColor = randomColor();
    for (const s of this.model.getShapesByType(clickedType)) {
      s.color = newColor;
      this.view.renderMap.redraw(s);
    }
  }

  private spawnShapeAt(x: number, y: number): void {
    const shape = createRandomShape(x, y);
    this.model.addShape(shape);
  }
}
