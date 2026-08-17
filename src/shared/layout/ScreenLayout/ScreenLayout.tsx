import type { ReactNode } from 'react';
import styles from './ScreenLayout.module.css';

export type ScreenLayoutProps = {
  readonly header?: ReactNode;
  readonly children: ReactNode;
};

export function ScreenLayout({ header, children }: ScreenLayoutProps) {
  return (
    <main className={styles.screen}>
      <div className={styles.content}>
        {header !== undefined ? (
          <div className={styles.header}>{header}</div>
        ) : null}
        <div className={styles.body}>{children}</div>
      </div>
    </main>
  );
}
