import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export type CardProps = {
  readonly children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </article>
  );
}

export type CardHeaderProps = {
  readonly children: ReactNode;
};

export function CardHeader({ children }: CardHeaderProps) {
  return <header className={styles.header}>{children}</header>;
}

export type CardContentProps = {
  readonly children: ReactNode;
};

export function CardContent({ children }: CardContentProps) {
  return <div className={styles.content}>{children}</div>;
}
