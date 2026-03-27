import { Application } from 'pixi.js';
import { GameView } from '../view/GameView';
import { GameModel } from '../model/GameModel';
import { GameController } from '../controller/GameController';
import { InputController } from '../controller/InputController';
import { ControlsController } from '../controller/ControlsController';
import { HudView } from '../view/HudView';
import { AREA_WIDTH, AREA_HEIGHT } from '../utils/constants';
import { createShape } from '../domain/ShapeFactory';
import { ShapeType } from '../model/types';

export class App {
  protected pixiApp!: Application;
  protected view!: GameView;
  protected model!: GameModel;
  protected controller!: GameController;
  protected inputController!: InputController;
  protected hudView!: HudView;
  protected controlsController!: ControlsController;

  async init(): Promise<void> {
    this.pixiApp = new Application();

    await this.pixiApp.init({
      width: AREA_WIDTH,
      height: AREA_HEIGHT,
      backgroundColor: 0x0d0d1a,
      antialias: true,
    });

    const container = document.getElementById('canvas-container');
    if (!container) throw new Error('#canvas-container not found');
    container.appendChild(this.pixiApp.canvas);

    this.model = new GameModel();
    this.view = new GameView(this.pixiApp);
    this.hudView = new HudView();
    this.controller = new GameController(this.model, this.view, this.hudView);
    this.inputController = new InputController(this.model, this.view);
    this.controlsController = new ControlsController(this.model);

    // TEST: 3 static shapes — removed in Stage 12
    const testShapes = [
      createShape(ShapeType.Triangle, 200, 150),
      createShape(ShapeType.Circle, 400, 300),
      createShape(ShapeType.Hexagon, 600, 200),
    ];
    for (const shape of testShapes) {
      this.model.addShape(shape);
    }
    this.view.syncShapes(this.model);

    this.controller.start();
  }
}
