export class BootScene {
  private el: HTMLElement;
  private fill: HTMLElement;

  constructor() {
    this.fill = document.createElement('div');
    this.fill.id = 'boot-fill';

    const track = document.createElement('div');
    track.id = 'boot-track';
    track.appendChild(this.fill);

    this.el = document.createElement('div');
    this.el.id = 'boot-scene';
    this.el.appendChild(track);

    document.body.appendChild(this.el);
  }

  setProgress(value: number): void {
    this.fill.style.width = `${Math.min(100, Math.max(0, value))}%`;
  }

  async hide(): Promise<void> {
    this.setProgress(100);
    await new Promise(r => setTimeout(r, 150));
    this.el.classList.add('boot-done');
    await new Promise(r => setTimeout(r, 350));
    this.el.remove();
  }
}
