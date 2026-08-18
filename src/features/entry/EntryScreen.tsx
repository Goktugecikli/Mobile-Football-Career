import { appConfig } from '@/config/appConfig';
import { Button } from '@/shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EntryScreen.module.css';

export function EntryScreen() {
  const navigate = useNavigate();

  return (
    <main className={styles.screen}>
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.vignette} />
        <div className={styles.spotLeft} />
        <div className={styles.spotRight} />
        <div className={styles.tunnel} />
        <div className={styles.pitch}>
          <span className={styles.pitchMid} />
          <span className={styles.pitchCircle} />
        </div>
        <div className={styles.goal} />
        <div className={styles.ball} />
      </div>

      <section className={styles.stage} aria-labelledby="entry-title">
        <div className={styles.brand}>
          <div className={styles.logoArea} aria-hidden="true">
            <div className={styles.crest}>
              <div className={styles.crestBall} />
            </div>
          </div>
          <h1 id="entry-title" className={styles.title}>
            {appConfig.appName}
          </h1>
        </div>

        <div className={styles.actions}>
          <Button
            fullWidth
            className={styles.playCta}
            onClick={() => navigate('/career-select')}
          >
            Oyna
          </Button>
          <div className={styles.secondaryActions}>
            <Button fullWidth variant="secondary" disabled>
              Eğitim
            </Button>
            <Button fullWidth variant="secondary" disabled>
              Ayarlar
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
