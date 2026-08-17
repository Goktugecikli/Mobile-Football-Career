import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: ReactNode;
  readonly actions?: ReactNode;
  readonly closeOnBackdropClick?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  closeOnBackdropClick = true,
}: ModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.root}>
      <div
        className={styles.backdrop}
        aria-hidden="true"
        data-interactive={closeOnBackdropClick ? true : undefined}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className={styles.content}>{children}</div>

        {actions !== undefined ? (
          <footer className={styles.actions}>{actions}</footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
