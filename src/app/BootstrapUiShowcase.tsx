import { useState } from 'react';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { Card, CardContent, CardHeader } from '@/shared/ui/Card/Card';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import styles from './BootstrapUiShowcase.module.css';

export function BootstrapUiShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.showcase} aria-label="UI primitive showcase">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>UI primitives</h2>
        <p className={styles.sectionDescription}>
          Temporary bootstrap preview of shared components. Not product UI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className={styles.cardTitle}>Buttons</h3>
        </CardHeader>
        <CardContent>
          <div className={styles.buttonRow}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className={styles.buttonRow}>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="secondary" fullWidth>
              Full width
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className={styles.cardTitle}>Badges</h3>
        </CardHeader>
        <CardContent>
          <div className={styles.badgeRow}>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className={styles.cardTitle}>Progress</h3>
        </CardHeader>
        <CardContent>
          <ProgressBar label="Default" value={62} showValue />
          <ProgressBar label="Success" value={84} variant="success" showValue />
          <ProgressBar label="Warning" value={38} variant="warning" showValue />
          <ProgressBar value={120} min={0} max={100} variant="danger" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className={styles.cardTitle}>Modal</h3>
        </CardHeader>
        <CardContent>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open modal
          </Button>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dialog shell preview"
        actions={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        Lightweight modal for confirmations and focused content. Escape, the
        close button, and backdrop click dismiss this preview.
      </Modal>
    </section>
  );
}
