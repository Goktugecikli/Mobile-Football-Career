import { Component, type ErrorInfo, type ReactNode } from 'react';
import { appConfig } from '@/config/appConfig';
import {
  AppError,
  ErrorCategory,
  ErrorCode,
  normalizeError,
} from '@/core/errors';
import styles from './AppErrorBoundary.module.css';

type AppErrorBoundaryProps = {
  readonly children: ReactNode;
};

type AppErrorBoundaryState = {
  error: AppError | null;
};

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  public constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  public static getDerivedStateFromError(
    error: unknown,
  ): AppErrorBoundaryState {
    if (error instanceof AppError) {
      return { error };
    }

    const normalized = normalizeError(error);
    return {
      error: new AppError(normalized.message, {
        code: ErrorCode.RENDER_FAILED,
        category: ErrorCategory.UI,
        cause: error,
      }),
    };
  }

  public override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(normalizeError(error), info.componentStack);
  }

  public override render(): ReactNode {
    const { error } = this.state;

    if (error === null) {
      return this.props.children;
    }

    return (
      <main className={styles.fallback} role="alert">
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.code}>{error.code}</p>
        {appConfig.environment === 'development' ? (
          <p className={styles.detail}>{error.message}</p>
        ) : null}
      </main>
    );
  }
}
