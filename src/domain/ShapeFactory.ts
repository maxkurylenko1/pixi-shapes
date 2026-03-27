import { Shape } from './Shape';
import { PolygonShape } from './shapes/PolygonShape';
import { CircleShape } from './shapes/CircleShape';
import { EllipseShape } from './shapes/EllipseShape';
import { ShapeType, ALL_SHAPE_TYPES } from '../model/types';
import { randomColor } from '../utils/randomColor';
import { SHAPE_MIN_RADIUS, SHAPE_MAX_RADIUS } from '../utils/constants';

function randomRadius(): number {
  return SHAPE_MIN_RADIUS + Math.random() * (SHAPE_MAX_RADIUS - SHAPE_MIN_RADIUS);
}

function randomType(): ShapeType {
  return ALL_SHAPE_TYPES[Math.floor(Math.random() * ALL_SHAPE_TYPES.length)];
}

export function createShape(type: ShapeType, x: number, y: number): Shape {
  const color = randomColor();
  const r = randomRadius();

  switch (type) {
    case ShapeType.Triangle:
      return new PolygonShape(ShapeType.Triangle, 3, r, x, y, color);
    case ShapeType.Quad:
      return new PolygonShape(ShapeType.Quad, 4, r, x, y, color);
    case ShapeType.Pentagon:
      return new PolygonShape(ShapeType.Pentagon, 5, r, x, y, color);
    case ShapeType.Hexagon:
      return new PolygonShape(ShapeType.Hexagon, 6, r, x, y, color);
    case ShapeType.Circle:
      return new CircleShape(r, x, y, color);
    case ShapeType.Ellipse: {
      const rx = randomRadius();
      const ry = randomRadius();
      return new EllipseShape(rx, ry, x, y, color);
    }
  }
}

export function createRandomShape(x: number, y: number): Shape {
  return createShape(randomType(), x, y);
}
