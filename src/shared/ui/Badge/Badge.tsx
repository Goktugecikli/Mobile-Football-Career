import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgeProps = {
  readonly variant?: BadgeVariant;
  readonly children: ReactNode;
};

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span className={styles.badge} data-variant={variant}>
      {children}
    </span>
  );
}
