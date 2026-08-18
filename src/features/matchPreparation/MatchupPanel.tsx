import styles from './MatchupPanel.module.css';

export function MatchupPanel() {
  return (
    <section className={styles.panel} aria-label="Karşılaşma">
      <div className={styles.side}>
        <span className={styles.crest} aria-hidden="true" />
        <p className={styles.team}>Takım</p>
      </div>
      <p className={styles.versus}>vs</p>
      <div className={styles.side}>
        <span className={styles.crest} aria-hidden="true" />
        <p className={styles.team}>Takım</p>
      </div>
    </section>
  );
}
