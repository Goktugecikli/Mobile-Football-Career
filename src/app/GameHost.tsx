import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { appConfig } from '@/config/appConfig';
import { ErrorCode } from '@/core/errors';
import { createPhaserGameSession } from '@/game/createPhaserGameSession';
import styles from './GameHost.module.css';

type HostStatus = 'pending' | 'ready' | 'failed';

export function GameHost() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<HostStatus>('pending');
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);

  useEffect(() => {
    const parent = parentRef.current;

    if (parent === null) {
      return;
    }

    const session = createPhaserGameSession(appConfig.game);
    let cancelled = false;

    session.start(parent, (event) => {
      if (cancelled) {
        return;
      }

      if (event.type === 'ready') {
        setStatus('ready');
        return;
      }

      setStatus('failed');
      setErrorCode(event.code);
    });

    return () => {
      cancelled = true;
      session.destroy();
    };
  }, []);

  return (
    <section className={styles.host} aria-label="Game host">
      <p className={styles.status}>
        {status === 'failed'
          ? `Game host failed (${errorCode ?? ErrorCode.UNKNOWN})`
          : `Game host: ${status}`}
      </p>
      <div
        ref={parentRef}
        className={styles.viewport}
        style={
          {
            '--game-aspect-ratio': `${appConfig.game.width} / ${appConfig.game.height}`,
          } as CSSProperties
        }
      />
    </section>
  );
}
