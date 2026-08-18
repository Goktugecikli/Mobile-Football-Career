import { appConfig } from '@/config/appConfig';
import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EntryScreen.module.css';

export function EntryScreen() {
  const navigate = useNavigate();

  return (
    <main className={styles.screen}>
      <div className={styles.atmosphere} aria-hidden="true" />

      <section className={styles.stage} aria-label={appConfig.appName}>
        <img
          className={styles.logo}
          src="/Logo/MainLogo.png"
          alt={appConfig.appName}
          width={1536}
          height={1024}
        />

        <div className={styles.actions}>
          <Button
            fullWidth
            className={styles.playCta}
            onClick={() => navigate(appPaths.careerSelect)}
          >
            Oyna
          </Button>
          <Button fullWidth className={styles.idleCta} variant="secondary" disabled>
            Eğitim
          </Button>
          <Button fullWidth className={styles.idleCta} variant="secondary" disabled>
            Ayarlar
          </Button>
        </div>
      </section>
    </main>
  );
}
