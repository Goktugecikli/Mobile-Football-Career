import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { CareerSlot } from './CareerSlot';
import styles from './CareerSelectScreen.module.css';

const slotNumbers = [1, 2, 3] as const;

export function CareerSelectScreen() {
  return (
    <ScreenLayout
      header={
        <div className={styles.header}>
          <h1 className={styles.title}>Kariyer Seçimi</h1>
        </div>
      }
    >
      <section className={styles.screen} aria-label="Kariyer slotları">
        {slotNumbers.map((slotNumber) => (
          <CareerSlot key={slotNumber} slotNumber={slotNumber} />
        ))}
      </section>
    </ScreenLayout>
  );
}
