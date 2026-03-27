import { GameModel } from '../model/GameModel';

const SPAWN_STEP = 1;
const GRAVITY_STEP = 0.5;
const SPAWN_MIN = 0;
const SPAWN_MAX = 30;
const GRAVITY_MIN = 0.5;
const GRAVITY_MAX = 20;

export class ControlsController {
  private model: GameModel;
  private spawnValueEl: HTMLElement;
  private gravityValueEl: HTMLElement;

  constructor(model: GameModel) {
    this.model = model;

    const spawnValueEl = document.getElementById('spawn-value');
    const gravityValueEl = document.getElementById('gravity-value');
    const spawnIncBtn = document.getElementById('spawn-inc');
    const spawnDecBtn = document.getElementById('spawn-dec');
    const gravityIncBtn = document.getElementById('gravity-inc');
    const gravityDecBtn = document.getElementById('gravity-dec');

    if (
      !spawnValueEl ||
      !gravityValueEl ||
      !spawnIncBtn ||
      !spawnDecBtn ||
      !gravityIncBtn ||
      !gravityDecBtn
    ) {
      throw new Error('Control elements not found in DOM');
    }

    this.spawnValueEl = spawnValueEl;
    this.gravityValueEl = gravityValueEl;

    spawnIncBtn.addEventListener('click', () => this.changeSpawnRate(SPAWN_STEP));
    spawnDecBtn.addEventListener('click', () => this.changeSpawnRate(-SPAWN_STEP));
    gravityIncBtn.addEventListener('click', () => this.changeGravity(GRAVITY_STEP));
    gravityDecBtn.addEventListener('click', () => this.changeGravity(-GRAVITY_STEP));

    this.updateDisplay();
  }

  private changeSpawnRate(delta: number): void {
    const newVal = Math.min(SPAWN_MAX, Math.max(SPAWN_MIN, this.model.config.spawnRate + delta));
    this.model.config.spawnRate = newVal;
    this.updateDisplay();
  }

  private changeGravity(delta: number): void {
    const newVal = Math.min(GRAVITY_MAX, Math.max(GRAVITY_MIN, this.model.config.gravity + delta));
    // Round to avoid floating-point drift
    this.model.config.gravity = Math.round(newVal * 10) / 10;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.spawnValueEl.textContent = String(this.model.config.spawnRate);
    this.gravityValueEl.textContent = String(this.model.config.gravity);
  }
}
