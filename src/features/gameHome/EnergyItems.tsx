import styles from './EnergyItems.module.css';

export function EnergyItems() {
  return (
    <section className={styles.section} aria-label="Enerji ürünleri">
      <h2 className={styles.heading}>Enerji ürünleri</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.icon} aria-hidden="true" />
          <span className={styles.name}>Ürün</span>
          <span className={styles.quantity}>—</span>
        </li>
      </ul>
    </section>
  );
}
