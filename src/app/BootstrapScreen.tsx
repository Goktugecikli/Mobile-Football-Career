import { appConfig } from '@/config/appConfig';
import { GameHost } from './GameHost';
import styles from './BootstrapScreen.module.css';

export function BootstrapScreen() {
  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <p className={styles.kicker}>Engineering foundation</p>
        <h1 className={styles.title}>{appConfig.appName}</h1>
        <p className={styles.copy}>
          React, design tokens, the error boundary, and the Phaser host are
          running. Product features are not implemented yet.
        </p>
      </header>
      <GameHost />
    </main>
  );
}
