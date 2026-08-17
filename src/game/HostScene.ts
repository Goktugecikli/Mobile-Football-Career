import * as Phaser from 'phaser';

export class HostScene extends Phaser.Scene {
  public constructor() {
    super({ key: 'HostScene' });
  }

  public create(): void {
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');
  }
}
