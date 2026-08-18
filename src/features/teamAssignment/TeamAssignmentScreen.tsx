import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './TeamAssignmentScreen.module.css';

export function TeamAssignmentScreen() {
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
              navigate(appPaths.initialTraining, { state: location.state })
            }
          >
            Geri
          </Button>
          <h1 className={styles.title}>Takım Ataması</h1>
        </div>
      }
    >
      <section className={styles.reveal} aria-labelledby="assignment-heading">
        <h2 id="assignment-heading" className={styles.heading}>
          Değerlendirme sonucu
        </h2>

        <div className={styles.crest} aria-hidden="true">
          <span className={styles.crestMark} />
        </div>

        <div className={styles.results}>
          <Card className={styles.resultCard}>
            <p className={styles.resultLabel}>Takım</p>
            <p className={styles.resultValue}>—</p>
          </Card>
          <Card className={styles.resultCard}>
            <p className={styles.resultLabel}>Maaş</p>
            <p className={styles.resultValue}>—</p>
          </Card>
        </div>
      </section>

      <Button fullWidth className={styles.continue} disabled>
        Devam
      </Button>
    </ScreenLayout>
  );
}
