import { AppError, ErrorCategory, ErrorCode } from '@/core/errors';
import type { GameHostConfig } from '@/core/gameSession';

export type AppEnvironment = 'development' | 'production';

export type AppConfig = {
  readonly appName: string;
  readonly environment: AppEnvironment;
  readonly game: GameHostConfig;
};

function readEnv(): {
  readonly gameWidth: string | undefined;
  readonly gameHeight: string | undefined;
  readonly mode: string;
} {
  return {
    gameWidth: import.meta.env.VITE_GAME_WIDTH,
    gameHeight: import.meta.env.VITE_GAME_HEIGHT,
    mode: import.meta.env.MODE,
  };
}

function parsePositiveInteger(
  value: string | undefined,
  fallback: number,
  label: string,
): number {
  if (value === undefined || value.trim() === '') {
    return fallback;
  }

  const trimmed = value.trim();
  const parsed = Number.parseInt(trimmed, 10);

  if (!Number.isInteger(parsed) || parsed <= 0 || String(parsed) !== trimmed) {
    throw new AppError(`Invalid configuration value for ${label}.`, {
      code: ErrorCode.CONFIG_INVALID,
      category: ErrorCategory.CONFIGURATION,
    });
  }

  return parsed;
}

function createAppConfig(): AppConfig {
  const env = readEnv();

  return {
    appName: 'Mobile Football Career',
    environment: env.mode === 'production' ? 'production' : 'development',
    game: {
      width: parsePositiveInteger(env.gameWidth, 360, 'VITE_GAME_WIDTH'),
      height: parsePositiveInteger(env.gameHeight, 640, 'VITE_GAME_HEIGHT'),
    },
  };
}

export const appConfig: AppConfig = createAppConfig();
