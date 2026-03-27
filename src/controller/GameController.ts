import { Ticker } from 'pixi.js';
import { GameModel } from '../model/GameModel';
import { GameView } from '../view/GameView';

export class GameController {
  private model: GameModel;
  private view: GameView;
  private ticker: Ticker;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.ticker = view.app.ticker;
  }

  start(): void {
    this.ticker.add(this.onTick, this);
  }

  stop(): void {
    this.ticker.remove(this.onTick, this);
  }

  private onTick(ticker: Ticker): void {
    const dt = ticker.deltaMS / 1000; // seconds
    const gravity = this.model.config.gravity;
    const bounds = this.view.getAreaBounds();
    const toRemove: string[] = [];

    for (const shape of this.model.getShapes()) {
      // Accelerate downward
      shape.velocityY += gravity * dt * 60; // scale to feel consistent across framerates
      shape.y += shape.velocityY * dt;

      // Mark for removal if below the generation area
      if (shape.y - shape.radius > bounds.height) {
        toRemove.push(shape.id);
      }
    }

    // Batch-remove shapes that fell out
    for (const id of toRemove) {
      this.model.removeShape(id);
      this.view.renderMap.remove(id);
    }

    // Sync remaining positions
    this.view.syncShapes(this.model);
  }
}
