import { appConfig } from '@/config/appConfig';
import { Button } from '@/shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EntryScreen.module.css';

export function EntryScreen() {
  const navigate = useNavigate();

  return (
    <main className={styles.screen}>
      <section className={styles.hero} aria-labelledby="entry-title">
        <div className={styles.background} aria-hidden="true">
          <div className={styles.backgroundGlow} />
          <div className={styles.pitchLines} />
          <div className={styles.animationStage}>
            <div className={styles.animationOrbit} />
            <div className={styles.ballCore} />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.brand}>
            <div className={styles.logoArea} aria-hidden="true">
              <div className={styles.logoMarkOuter}>
                <div className={styles.logoMarkInner} />
              </div>
            </div>
            <h1 id="entry-title" className={styles.title}>
              {appConfig.appName}
            </h1>
          </div>

          <div className={styles.actions}>
            <Button fullWidth onClick={() => navigate('/career-select')}>
              Oyna
            </Button>
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
