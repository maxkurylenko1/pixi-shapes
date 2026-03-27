import { Shape } from './Shape';
import { PolygonShape } from './shapes/PolygonShape';
import { CircleShape } from './shapes/CircleShape';
import { EllipseShape } from './shapes/EllipseShape';
import { ShapeType } from '../model/types';

/**
 * Returns the area of a shape in px².
 * - Regular polygon: (n * r² * sin(2π/n)) / 2
 * - Circle: π * r²
 * - Ellipse: π * rx * ry
 */
export function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case ShapeType.Triangle:
    case ShapeType.Quad:
    case ShapeType.Pentagon:
    case ShapeType.Hexagon: {
      const poly = shape as PolygonShape;
      const n = poly.sides;
      return (n * poly.radius * poly.radius * Math.sin((2 * Math.PI) / n)) / 2;
    }
    case ShapeType.Circle: {
      const circle = shape as CircleShape;
      return Math.PI * circle.radius * circle.radius;
    }
    case ShapeType.Ellipse: {
      const ellipse = shape as EllipseShape;
      return Math.PI * ellipse.radiusX * ellipse.radiusY;
    }
  }
}
