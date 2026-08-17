import { useNavigate } from 'react-router-dom';
import { appPaths } from '@/app/routing/appPaths';
import { Button } from '@/shared/ui/Button/Button';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import styles from './NotFoundScreen.module.css';

export function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <ScreenLayout
      header={
        <>
          <p className={styles.kicker}>Not found</p>
          <h1 className={styles.title}>Screen unavailable</h1>
          <p className={styles.copy}>
            This route is not defined yet. Product screens will be added after
            the screen map is approved.
          </p>
        </>
      }
    >
      <Button
        variant="secondary"
        onClick={() => navigate(appPaths.bootstrap)}
      >
        Return to bootstrap
      </Button>
    </ScreenLayout>
  );
}
