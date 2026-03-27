import { Ticker } from 'pixi.js';
import { GameModel } from '../model/GameModel';
import { GameView } from '../view/GameView';
import { createRandomShape } from '../domain/ShapeFactory';

export class GameController {
  private model: GameModel;
  private view: GameView;
  private ticker: Ticker;
  private spawnAccumulator = 0; // milliseconds since last spawn

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

    // ── Physics ──────────────────────────────────────────
    for (const shape of this.model.getShapes()) {
      shape.velocityY += gravity * dt * 60;
      shape.y += shape.velocityY * dt;

      if (shape.y - shape.radius > bounds.height) {
        toRemove.push(shape.id);
      }
    }

    for (const id of toRemove) {
      this.model.removeShape(id);
      this.view.renderMap.remove(id);
    }

    // ── Auto-spawn ───────────────────────────────────────
    const spawnRate = this.model.config.spawnRate;
    if (spawnRate > 0) {
      this.spawnAccumulator += ticker.deltaMS;
      const interval = 1000 / spawnRate;

      while (this.spawnAccumulator >= interval) {
        this.spawnAccumulator -= interval;
        this.spawnShapeAtTop();
      }
    }

    // ── Render sync ──────────────────────────────────────
    this.view.syncShapes(this.model);
  }

  private spawnShapeAtTop(): void {
    const bounds = this.view.getAreaBounds();
    const shape = createRandomShape(0, 0); // temp coords
    const x = shape.radius + Math.random() * (bounds.width - shape.radius * 2);
    const y = -shape.radius; // just above the top edge
    shape.x = x;
    shape.y = y;
    this.model.addShape(shape);
  }
}
