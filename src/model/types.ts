export enum ShapeType {
  Triangle = 'triangle',
  Quad = 'quad',
  Pentagon = 'pentagon',
  Hexagon = 'hexagon',
  Circle = 'circle',
  Ellipse = 'ellipse',
}

export const ALL_SHAPE_TYPES: ShapeType[] = [
  ShapeType.Triangle,
  ShapeType.Quad,
  ShapeType.Pentagon,
  ShapeType.Hexagon,
  ShapeType.Circle,
  ShapeType.Ellipse,
];

export interface Config {
  gravity: number;
  spawnRate: number;
}
