import styles from './TeamSection.module.css';

export function TeamSection() {
  return (
    <section className={styles.section} aria-label="Takımlar">
      <h2 className={styles.heading}>Takımlar</h2>
      <ul className={styles.list}>
        <li className={styles.row}>
          <span className={styles.crest} aria-hidden="true" />
          <div className={styles.copy}>
            <p className={styles.label}>1. Takım</p>
            <p className={styles.value}>—</p>
          </div>
        </li>
        <li className={styles.row}>
          <span className={styles.crest} aria-hidden="true" />
          <div className={styles.copy}>
            <p className={styles.label}>Milli Takım</p>
            <p className={styles.value}>—</p>
          </div>
        </li>
      </ul>
    </section>
  );
}
