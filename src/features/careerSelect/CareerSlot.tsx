import { Button } from '@/shared/ui/Button/Button';
import { Card, CardContent, CardHeader } from '@/shared/ui/Card/Card';
import styles from './CareerSlot.module.css';

export type CareerSlotProps = {
  readonly slotNumber: number;
};

export function CareerSlot({ slotNumber }: CareerSlotProps) {
  return (
    <Card className={styles.slot}>
      <CardHeader>
        <div className={styles.header}>
          <span className={styles.slotLabel}>Slot {slotNumber}</span>
          <span className={styles.status}>Boş</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className={styles.placeholder} aria-hidden="true">
          <span className={styles.plus}>+</span>
        </div>
        <Button fullWidth variant="secondary" disabled>
          Yeni Kariyer
        </Button>
      </CardContent>
    </Card>
  );
}
