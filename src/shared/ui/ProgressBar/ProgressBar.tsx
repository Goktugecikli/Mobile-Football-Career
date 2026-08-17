import { useId } from 'react';
import styles from './ProgressBar.module.css';
import { normalizeProgress } from './normalizeProgress';

export type ProgressBarVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger';

export type ProgressBarProps = {
  readonly value: number;
  readonly min?: number;
  readonly max?: number;
  readonly variant?: ProgressBarVariant;
  readonly label?: string;
  readonly showValue?: boolean;
};

export function ProgressBar({
  value,
  min = 0,
  max = 100,
  variant = 'default',
  label,
  showValue = false,
}: ProgressBarProps) {
  const labelId = useId();
  const { clampedValue, percentage } = normalizeProgress(value, min, max);
  const roundedPercentage = Math.round(percentage);
  const accessibleLabel =
    label ?? `Progress: ${roundedPercentage} percent`;

  return (
    <div className={styles.root}>
      {label !== undefined ? (
        <div className={styles.labelRow}>
          <span id={labelId} className={styles.label}>
            {label}
          </span>
          {showValue ? (
            <span className={styles.value} aria-hidden="true">
              {roundedPercentage}%
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={Math.min(min, max)}
        aria-valuemax={Math.max(min, max)}
        aria-valuenow={clampedValue}
        aria-label={label === undefined ? accessibleLabel : undefined}
        aria-labelledby={label !== undefined ? labelId : undefined}
        data-variant={variant}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
