import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FixturePanel } from './FixturePanel';
import { KitSelector } from './KitSelector';
import styles from './MatchEntryScreen.module.css';

export function MatchEntryScreen() {
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
              navigate(appPaths.gameHome, { state: location.state })
            }
          >
            Geri
          </Button>
          <h1 className={styles.title}>Maç</h1>
        </div>
      }
    >
      <FixturePanel />
      <KitSelector />
      <Button
        fullWidth
        className={styles.continue}
        onClick={() =>
          navigate(appPaths.matchPreparation, { state: location.state })
        }
      >
        Devam
      </Button>
    </ScreenLayout>
  );
}
