import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './InitialTrainingScreen.module.css';

export function InitialTrainingScreen() {
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
            onClick={() => navigate(appPaths.profileCreate, { state: location.state })}
          >
            Geri
          </Button>
          <h1 className={styles.title}>Antrenman</h1>
        </div>
      }
    >
      <section className={styles.intro} aria-labelledby="training-heading">
        <div className={styles.pitch} aria-hidden="true">
          <span className={styles.pitchMid} />
          <span className={styles.pitchCircle} />
          <span className={styles.coneLeft} />
          <span className={styles.coneRight} />
          <span className={styles.target} />
          <span className={styles.ball} />
        </div>

        <div className={styles.copy}>
          <h2 id="training-heading" className={styles.heading}>
            Başlangıç değerlendirmesi
          </h2>
          <p className={styles.body}>
            Profilinden sonra oyuncunun başlangıç seviyesi antrenmanla
            belirlenecek. Antrenman içeriği henüz hazır değil.
          </p>
        </div>
      </section>

      <div className={styles.actions}>
        <Button fullWidth disabled>
          Antrenmana Başla
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={() =>
            navigate(appPaths.teamAssignment, { state: location.state })
          }
        >
          Sonucu Önizle
        </Button>
        <p className={styles.previewNote}>
          Geçici geliştirme önizlemesi. Gerçek antrenman tamamlanmış sayılmaz.
        </p>
      </div>
    </ScreenLayout>
  );
}
