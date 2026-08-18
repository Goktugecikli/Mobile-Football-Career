import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { EnergyItems } from './EnergyItems';
import { EquipmentSection } from './EquipmentSection';
import { TeamSection } from './TeamSection';
import styles from './GameHomeScreen.module.css';

export function GameHomeScreen() {
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
              navigate(appPaths.teamAssignment, { state: location.state })
            }
          >
            Geri
          </Button>

          <div className={styles.player}>
            <span className={styles.avatar} aria-hidden="true" />
            <div className={styles.playerCopy}>
              <p className={styles.playerName}>Oyuncu</p>
              <p className={styles.playerMeta}>Mevki · Cinsiyet</p>
            </div>
          </div>

          <Button
            className={styles.helpButton}
            variant="ghost"
            disabled
            aria-label="Yardım"
          >
            ?
          </Button>
        </div>
      }
    >
      <section className={styles.energy} aria-label="Enerji">
        <ProgressBar label="Enerji" value={0} />
      </section>

      <TeamSection />
      <EquipmentSection />
      <EnergyItems />

      <Button
        fullWidth
        className={styles.playCta}
        onClick={() => navigate(appPaths.matchEntry, { state: location.state })}
      >
        Oyna
      </Button>
    </ScreenLayout>
  );
}
