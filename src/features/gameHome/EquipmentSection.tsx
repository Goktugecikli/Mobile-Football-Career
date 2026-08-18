import { Button } from '@/shared/ui/Button/Button';
import styles from './EquipmentSection.module.css';

export function EquipmentSection() {
  return (
    <section className={styles.section} aria-label="Ekipman">
      <div className={styles.header}>
        <h2 className={styles.heading}>Krampon</h2>
        <Button variant="secondary" disabled>
          Dükkan
        </Button>
      </div>

      <div className={styles.bootRow}>
        <span className={styles.boot} aria-hidden="true" />
        <div className={styles.copy}>
          <p className={styles.name}>Krampon</p>
          <p className={styles.meta}>Kalan kullanım: —</p>
        </div>
      </div>
    </section>
  );
}
