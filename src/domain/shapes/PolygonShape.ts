import { Shape } from '../Shape';
import { ShapeType } from '../../model/types';

export class PolygonShape extends Shape {
  readonly sides: number;
  readonly radius: number;

  constructor(type: ShapeType, sides: number, radius: number, x: number, y: number, color: number) {
    super(type, x, y, color);
    this.sides = sides;
    this.radius = radius;
  }
}
