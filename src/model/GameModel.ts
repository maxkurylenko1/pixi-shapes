import { Shape } from '../domain/Shape';
import { Config } from './types';
import { DEFAULT_GRAVITY, DEFAULT_SPAWN_RATE } from '../utils/constants';

export class GameModel {
  private shapes: Shape[] = [];
  config: Config = {
    gravity: DEFAULT_GRAVITY,
    spawnRate: DEFAULT_SPAWN_RATE,
  };

  addShape(shape: Shape): void {
    this.shapes.push(shape);
  }

  removeShape(id: string): Shape | undefined {
    const idx = this.shapes.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    return this.shapes.splice(idx, 1)[0];
  }

  getShapes(): readonly Shape[] {
    return this.shapes;
  }

  getShapeById(id: string): Shape | undefined {
    return this.shapes.find((s) => s.id === id);
  }

  getShapesByType(type: string): Shape[] {
    return this.shapes.filter((s) => s.type === type);
  }
}
