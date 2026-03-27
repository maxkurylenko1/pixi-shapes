import { Shape } from '../Shape';
import { ShapeType } from '../../model/types';

/** Covers Triangle (3), Quad (4), Pentagon (5), Hexagon (6) */
export class PolygonShape extends Shape {
  readonly sides: number;
  readonly radius: number;

  constructor(type: ShapeType, sides: number, radius: number, x: number, y: number, color: number) {
    super(type, x, y, color);
    this.sides = sides;
    this.radius = radius;
  }
}
