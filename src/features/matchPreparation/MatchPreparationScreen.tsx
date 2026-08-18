import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { BallSelector } from './BallSelector';
import { MatchupPanel } from './MatchupPanel';
import styles from './MatchPreparationScreen.module.css';

export function MatchPreparationScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ScreenLayout
      header={
        <div className={styles.header}>
          <Button
            className={styles.backButton}
            variant="ghost"
            aria-label="Geri"
            onClick={() =>
              navigate(appPaths.matchEntry, { state: location.state })
            }
          >
            Geri
          </Button>
          <h1 className={styles.title}>Hazırlık</h1>
        </div>
      }
    >
      <MatchupPanel />
      <BallSelector />

      <section className={styles.energy} aria-label="Enerji">
        <ProgressBar label="Enerji" value={0} />
      </section>

      <section className={styles.items} aria-label="Enerji ürünleri">
        <h2 className={styles.heading}>Enerji ürünleri</h2>
        <div className={styles.itemRow}>
          <span className={styles.itemIcon} aria-hidden="true" />
          <span className={styles.itemName}>Ürün</span>
          <span className={styles.itemQuantity}>—</span>
        </div>
      </section>

      <Button fullWidth className={styles.startCta} disabled>
        Başla
      </Button>
    </ScreenLayout>
  );
}
