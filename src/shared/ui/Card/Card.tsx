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
  readonly className?: string;
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(' ')}>
      {children}
    </header>
  );
}

export type CardContentProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={[styles.content, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
