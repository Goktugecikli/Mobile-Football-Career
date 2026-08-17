import type { ErrorCode } from './errors';

export type GameHostConfig = {
  readonly width: number;
  readonly height: number;
};

export type GameEvent =
  | { readonly type: 'ready' }
  | { readonly type: 'failed'; readonly code: ErrorCode };

export type GameEventHandler = (event: GameEvent) => void;

export interface GameSession {
  start(parent: HTMLElement, onEvent?: GameEventHandler): void;
  destroy(): void;
}
