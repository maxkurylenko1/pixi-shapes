import { Graphics, Container, FederatedPointerEvent } from 'pixi.js';
import { Shape } from '../domain/Shape';
import { PolygonShape } from '../domain/shapes/PolygonShape';
import { CircleShape } from '../domain/shapes/CircleShape';
import { EllipseShape } from '../domain/shapes/EllipseShape';
import { ShapeType } from '../model/types';

export function drawShape(shape: Shape, gfx: Graphics): void {
  gfx.clear();

  switch (shape.type) {
    case ShapeType.Triangle:
    case ShapeType.Quad:
    case ShapeType.Pentagon:
    case ShapeType.Hexagon:
      drawPolygon(shape as PolygonShape, gfx);
      break;
    case ShapeType.Circle:
      drawCircle(shape as CircleShape, gfx);
      break;
    case ShapeType.Ellipse:
      drawEllipse(shape as EllipseShape, gfx);
      break;
  }
}

function drawPolygon(shape: PolygonShape, gfx: Graphics): void {
  const { sides, radius, color } = shape;
  const points: number[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    points.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  gfx.poly(points).fill(color);
}

function drawCircle(shape: CircleShape, gfx: Graphics): void {
  gfx.circle(0, 0, shape.radius).fill(shape.color);
}

function drawEllipse(shape: EllipseShape, gfx: Graphics): void {
  gfx.ellipse(0, 0, shape.radiusX, shape.radiusY).fill(shape.color);
}

export class ShapeRenderMap {
  private map = new Map<string, Graphics>();
  readonly container: Container;
  private onShapeClick: ((id: string) => void) | null = null;

  constructor(container: Container) {
    this.container = container;
  }

  setShapeClickHandler(handler: (id: string) => void): void {
    this.onShapeClick = handler;
  }

  add(shape: Shape): Graphics {
    const gfx = new Graphics();
    drawShape(shape, gfx);
    gfx.x = shape.x;
    gfx.y = shape.y;

    gfx.eventMode = 'static';
    gfx.cursor = 'pointer';
    const id = shape.id;
    gfx.on('pointerdown', (e: FederatedPointerEvent) => {
      e.stopPropagation();
      this.onShapeClick?.(id);
    });

    this.container.addChild(gfx);
    this.map.set(shape.id, gfx);
    return gfx;
  }

  update(shape: Shape): void {
    const gfx = this.map.get(shape.id);
    if (!gfx) return;
    gfx.x = shape.x;
    gfx.y = shape.y;
  }

  redraw(shape: Shape): void {
    const gfx = this.map.get(shape.id);
    if (!gfx) return;
    drawShape(shape, gfx);
  }

  remove(id: string): void {
    const gfx = this.map.get(id);
    if (!gfx) return;
    this.container.removeChild(gfx);
    gfx.destroy();
    this.map.delete(id);
  }

  getGraphics(id: string): Graphics | undefined {
    return this.map.get(id);
  }

  has(id: string): boolean {
    return this.map.has(id);
  }
}
