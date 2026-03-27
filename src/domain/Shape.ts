import { ShapeType } from '../model/types';

let nextId = 0;

export abstract class Shape {
  readonly id: string;
  readonly type: ShapeType;
  x: number;
  y: number;
  color: number;
  velocityY: number = 0;

  abstract readonly radius: number;

  constructor(type: ShapeType, x: number, y: number, color: number) {
    this.id = `shape_${nextId++}`;
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = color;
  }
}
