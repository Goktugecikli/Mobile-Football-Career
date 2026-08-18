import { appPaths, type CareerOnboardingState } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useNavigate } from 'react-router-dom';
import { CareerSlot } from './CareerSlot';
import styles from './CareerSelectScreen.module.css';

const slotNumbers = [1, 2, 3] as const;

export function CareerSelectScreen() {
  const navigate = useNavigate();

  return (
    <ScreenLayout
      header={
        <div className={styles.header}>
          <Button
            className={styles.backButton}
            variant="ghost"
            aria-label="Geri"
            onClick={() => navigate(appPaths.entry)}
          >
            Geri
          </Button>
          <h1 className={styles.title}>Kariyer Seçimi</h1>
        </div>
      }
    >
      <section className={styles.slots} aria-label="Kariyer slotları">
        {slotNumbers.map((slotNumber) => (
          <CareerSlot
            key={slotNumber}
            slotNumber={slotNumber}
            onCreate={() => {
              const state: CareerOnboardingState = { slotNumber };
              navigate(appPaths.profileCreate, { state });
            }}
          />
        ))}
      </section>
    </ScreenLayout>
  );
}
