import { Badge } from '@/shared/ui/Badge/Badge';
import { Card } from '@/shared/ui/Card/Card';
import type { KeyboardEvent } from 'react';
import styles from './CareerSlot.module.css';

export type CareerSlotProps = {
  readonly slotNumber: number;
  readonly onCreate: () => void;
};

export function CareerSlot({ slotNumber, onCreate }: CareerSlotProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCreate();
    }
  }

  return (
    <Card
      className={styles.slot}
      role="button"
      tabIndex={0}
      aria-label={`Slot ${slotNumber}, yeni kariyer`}
      onClick={onCreate}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.lead}>
        <span className={styles.plus} aria-hidden="true">
          +
        </span>
        <span className={styles.slotLabel}>Slot {slotNumber}</span>
      </div>

      <div className={styles.copy}>
        <p className={styles.actionLabel}>Yeni Kariyer</p>
        <Badge variant="neutral">Boş</Badge>
      </div>

      <span className={styles.forward} aria-hidden="true">
        ›
      </span>
    </Card>
  );
}
