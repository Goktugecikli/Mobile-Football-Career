export const ErrorCode = {
  UNKNOWN: 'UNKNOWN',
  CONFIG_INVALID: 'CONFIG_INVALID',
  GAME_INIT_FAILED: 'GAME_INIT_FAILED',
  RENDER_FAILED: 'RENDER_FAILED',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const ErrorCategory = {
  APPLICATION: 'APPLICATION',
  CONFIGURATION: 'CONFIGURATION',
  GAME: 'GAME',
  UI: 'UI',
} as const;

export type ErrorCategory = (typeof ErrorCategory)[keyof typeof ErrorCategory];

export type AppErrorOptions = {
  readonly code: ErrorCode;
  readonly category: ErrorCategory;
  readonly cause?: unknown;
};

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly category: ErrorCategory;

  public constructor(message: string, options: AppErrorOptions) {
    super(message, { cause: options.cause });
    this.name = 'AppError';
    this.code = options.code;
    this.category = options.category;
  }
}

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, {
      code: ErrorCode.UNKNOWN,
      category: ErrorCategory.APPLICATION,
      cause: error,
    });
  }

  return new AppError('An unexpected error occurred.', {
    code: ErrorCode.UNKNOWN,
    category: ErrorCategory.APPLICATION,
    cause: error,
  });
}
