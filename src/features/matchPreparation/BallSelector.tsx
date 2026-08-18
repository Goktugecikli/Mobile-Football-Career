import styles from './BallSelector.module.css';

export function BallSelector() {
  return (
    <section className={styles.section} aria-label="Top seçimi">
      <h2 className={styles.heading}>Top</h2>
      <div className={styles.row}>
        <span className={styles.ball} aria-hidden="true" />
        <div className={styles.copy}>
          <p className={styles.name}>Top</p>
          <p className={styles.meta}>Seçili</p>
        </div>
        <button type="button" className={styles.change} aria-label="Topu değiştir">
          Değiştir
        </button>
      </div>
    </section>
  );
}
