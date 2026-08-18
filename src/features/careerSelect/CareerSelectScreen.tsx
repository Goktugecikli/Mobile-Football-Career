import { appPaths } from '@/app/routing/appPaths';
import { CAREER_SLOT_IDS } from '@/core/career';
import { useCareerStore } from '@/shared/career/careerStore';
import { Button } from '@/shared/ui/Button/Button';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useNavigate } from 'react-router-dom';
import { CareerSlot } from './CareerSlot';
import styles from './CareerSelectScreen.module.css';

export function CareerSelectScreen() {
  const navigate = useNavigate();
  const activateSlot = useCareerStore((state) => state.activateSlot);

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
        {CAREER_SLOT_IDS.map((slotId) => (
          <CareerSlot
            key={slotId}
            slotId={slotId}
            onCreate={() => {
              activateSlot(slotId);
              navigate(appPaths.profileCreate);
            }}
          />
        ))}
      </section>
    </ScreenLayout>
  );
}
