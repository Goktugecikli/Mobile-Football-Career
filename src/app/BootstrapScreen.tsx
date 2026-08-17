import { appConfig } from '@/config/appConfig';
import { BootstrapUiShowcase } from './BootstrapUiShowcase';
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

      <section
        className={styles.runtimePanel}
        aria-label="Runtime verification"
      >
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Phaser host</h2>
          <p className={styles.panelDescription}>
            Canvas runtime connected to the application shell.
          </p>
        </div>
        <GameHost />
      </section>

      <BootstrapUiShowcase />
    </main>
  );
}
