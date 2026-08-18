import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = {
  readonly variant?: ButtonVariant;
  readonly loading?: boolean;
  readonly fullWidth?: boolean;
  readonly children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled === true || loading;

  return (
    <button
      type={type}
      className={[styles.button, className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-full-width={fullWidth ? true : undefined}
      disabled={isDisabled}
      aria-busy={loading ? true : undefined}
      {...rest}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span className={styles.label} data-loading={loading ? true : undefined}>
        {children}
      </span>
    </button>
  );
}
