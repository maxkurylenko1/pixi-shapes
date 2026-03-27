import { Shape } from '../Shape';
import { ShapeType } from '../../model/types';

export class EllipseShape extends Shape {
  readonly radiusX: number;
  readonly radiusY: number;
  /** Bounding radius = max of the two axes */
  readonly radius: number;

  constructor(radiusX: number, radiusY: number, x: number, y: number, color: number) {
    super(ShapeType.Ellipse, x, y, color);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.radius = Math.max(radiusX, radiusY);
  }
}
