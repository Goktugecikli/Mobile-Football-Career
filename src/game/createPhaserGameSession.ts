import * as Phaser from 'phaser';
import { AppError, ErrorCategory, ErrorCode } from '@/core/errors';
import type {
  GameEventHandler,
  GameHostConfig,
  GameSession,
} from '@/core/gameSession';
import { HostScene } from './HostScene';

export function createPhaserGameSession(config: GameHostConfig): GameSession {
  return new PhaserGameSession(config);
}

class PhaserGameSession implements GameSession {
  private game: Phaser.Game | undefined;
  private resizeObserver: ResizeObserver | undefined;
  private readonly config: GameHostConfig;

  public constructor(config: GameHostConfig) {
    this.config = config;
  }

  public start(parent: HTMLElement, onEvent?: GameEventHandler): void {
    if (this.game !== undefined) {
      throw new AppError('Game session already started.', {
        code: ErrorCode.GAME_INIT_FAILED,
        category: ErrorCategory.GAME,
      });
    }

    try {
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent,
        width: this.config.width,
        height: this.config.height,
        transparent: true,
        banner: false,
        scene: [HostScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      });

      this.game = game;
      this.resizeObserver = new ResizeObserver(() => {
        game.scale.refresh();
      });
      this.resizeObserver.observe(parent);

      game.events.once(Phaser.Core.Events.READY, () => {
        onEvent?.({ type: 'ready' });
      });
    } catch (cause) {
      this.game = undefined;
      this.resizeObserver?.disconnect();
      this.resizeObserver = undefined;
      const error = new AppError('Failed to initialize the Phaser host.', {
        code: ErrorCode.GAME_INIT_FAILED,
        category: ErrorCategory.GAME,
        cause,
      });
      console.error(error);
      queueMicrotask(() => {
        onEvent?.({ type: 'failed', code: error.code });
      });
    }
  }

  public destroy(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;

    if (this.game === undefined) {
      return;
    }

    this.game.destroy(true);
    this.game = undefined;
  }
}
