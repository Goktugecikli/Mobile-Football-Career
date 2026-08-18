import styles from './FixturePanel.module.css';

const fixtureSlots = [0, 1, 2] as const;

export function FixturePanel() {
  return (
    <section className={styles.section} aria-label="Fikstür">
      <h2 className={styles.heading}>Fikstür</h2>
      <ul className={styles.list}>
        {fixtureSlots.map((slot) => (
          <li
            key={slot}
            className={styles.row}
            data-highlighted={slot === 0 ? true : undefined}
            aria-current={slot === 0 ? 'true' : undefined}
          >
            <div className={styles.side}>
              <span className={styles.crest} aria-hidden="true" />
              <span className={styles.team}>Takım</span>
            </div>
            <span className={styles.versus}>vs</span>
            <div className={styles.side}>
              <span className={styles.team}>Takım</span>
              <span className={styles.crest} aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.note}>Oyuncu takımı görsel olarak işaretli.</p>
    </section>
  );
}
