import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { Card, CardContent, CardHeader } from '@/shared/ui/Card/Card';
import styles from './CareerSlot.module.css';

export type CareerSlotProps = {
  readonly slotNumber: number;
};

export function CareerSlot({ slotNumber }: CareerSlotProps) {
  const slotIndex = String(slotNumber).padStart(2, '0');

  return (
    <Card className={styles.slot}>
      <CardHeader>
        <div className={styles.header}>
          <span className={styles.slotLabel}>Slot {slotIndex}</span>
          <Badge variant="neutral">Boş</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className={styles.preview}>
          <div className={styles.emptyMark} aria-hidden="true">
            <span className={styles.plusRing}>+</span>
          </div>
        </div>
        <Button fullWidth variant="secondary" disabled>
          Yeni Kariyer
        </Button>
      </CardContent>
    </Card>
  );
}
