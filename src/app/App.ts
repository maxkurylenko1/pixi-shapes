import { Application } from 'pixi.js';
import { GameView } from '../view/GameView';
import { AREA_WIDTH, AREA_HEIGHT } from '../utils/constants';

export class App {
  private pixiApp!: Application;
  protected view!: GameView;

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

    this.view = new GameView(this.pixiApp);
  }
}
