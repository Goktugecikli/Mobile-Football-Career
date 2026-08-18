import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import styles from './CareerSlot.module.css';

export type CareerSlotProps = {
  readonly slotNumber: number;
};

export function CareerSlot({ slotNumber }: CareerSlotProps) {
  return (
    <Card className={styles.slot} aria-label={`Slot ${slotNumber}, boş`}>
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

      <Button
        className={styles.forward}
        variant="ghost"
        disabled
        aria-label={`Slot ${slotNumber} için yeni kariyer`}
      >
        <span aria-hidden="true">›</span>
      </Button>
    </Card>
  );
}
