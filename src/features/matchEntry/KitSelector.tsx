import { useState } from 'react';
import styles from './KitSelector.module.css';

const kitSlots = [0, 1] as const;

export function KitSelector() {
  const [selectedKit, setSelectedKit] = useState<(typeof kitSlots)[number]>(0);

  return (
    <section className={styles.section} aria-label="Forma seçimi">
      <h2 className={styles.heading}>Forma</h2>
      <div className={styles.choices} role="group" aria-label="Forma seçenekleri">
        {kitSlots.map((slot) => {
          const selected = slot === selectedKit;

          return (
            <button
              key={slot}
              type="button"
              className={styles.choice}
              aria-pressed={selected}
              aria-label={`Forma ${slot + 1}`}
              onClick={() => setSelectedKit(slot)}
            >
              <span
                className={styles.shirt}
                data-tone={slot === 0 ? 'a' : 'b'}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
