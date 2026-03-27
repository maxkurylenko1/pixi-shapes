export class HudView {
  private countEl: HTMLElement;
  private areaEl: HTMLElement;

  constructor() {
    const countEl = document.getElementById('hud-count');
    const areaEl = document.getElementById('hud-area');
    if (!countEl || !areaEl) throw new Error('HUD elements not found in DOM');
    this.countEl = countEl;
    this.areaEl = areaEl;
  }

  update(count: number, totalArea: number): void {
    this.countEl.textContent = String(count);
    this.areaEl.textContent = Math.round(totalArea).toLocaleString();
  }
}
