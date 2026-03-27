import { Shape } from '../Shape';
import { ShapeType } from '../../model/types';

export class CircleShape extends Shape {
  readonly radius: number;

  constructor(radius: number, x: number, y: number, color: number) {
    super(ShapeType.Circle, x, y, color);
    this.radius = radius;
  }
}
