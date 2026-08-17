import type { ReactNode } from 'react';
import styles from './AppShell.module.css';

export type AppShellProps = {
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
};

export function AppShell({ header, footer, children }: AppShellProps) {
  return (
    <div className={styles.shell}>
      {header !== undefined ? (
        <header className={styles.header}>{header}</header>
      ) : null}
      <div className={styles.main}>{children}</div>
      {footer !== undefined ? (
        <footer className={styles.footer}>{footer}</footer>
      ) : null}
    </div>
  );
}
