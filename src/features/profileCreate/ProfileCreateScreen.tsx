import { appPaths } from '@/app/routing/appPaths';
import {
  selectActiveProfile,
  useCareerStore,
} from '@/shared/career/careerStore';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { ScreenLayout } from '@/shared/layout/ScreenLayout/ScreenLayout';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileCreateScreen.module.css';

export function ProfileCreateScreen() {
  const navigate = useNavigate();
  const profile = useCareerStore(selectActiveProfile);
  const updateProfileDraft = useCareerStore((state) => state.updateProfileDraft);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(appPaths.initialTraining);
  }

  const firstName = profile?.firstName ?? '';
  const lastName = profile?.lastName ?? '';

  return (
    <ScreenLayout
      header={
        <div className={styles.header}>
          <Button
            className={styles.backButton}
            variant="ghost"
            aria-label="Geri"
            onClick={() => navigate(appPaths.careerSelect)}
          >
            Geri
          </Button>
          <h1 className={styles.title}>Profil Oluştur</h1>
        </div>
      }
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <Card className={styles.sheet}>
          <ProfileSelectRow label="Ayak" value={profile?.preferredFoot ?? null} />
          <ProfileTextRow
            id="profile-first-name"
            label="Ad"
            value={firstName}
            autoComplete="given-name"
            enterKeyHint="next"
            onChange={(value) => updateProfileDraft({ firstName: value })}
          />
          <ProfileTextRow
            id="profile-last-name"
            label="Soyad"
            value={lastName}
            autoComplete="family-name"
            enterKeyHint="done"
            onChange={(value) => updateProfileDraft({ lastName: value })}
          />
          <ProfileSelectRow label="Cinsiyet" value={profile?.gender ?? null} />
          <ProfileSelectRow label="Mevki" value={profile?.position ?? null} />
          <ProfileSelectRow label="Lig" value={profile?.league ?? null} />
          <ProfileSelectRow label="Uyruk" value={profile?.nationality ?? null} />
        </Card>

        <Button fullWidth type="submit" className={styles.continue}>
          Devam
        </Button>
      </form>
    </ScreenLayout>
  );
}

type ProfileSelectRowProps = {
  readonly label: string;
  readonly value: string | null;
};

function ProfileSelectRow({ label, value }: ProfileSelectRowProps) {
  const displayValue = value !== null && value.trim() !== '' ? value : 'Seç';

  return (
    <div className={styles.row}>
      <span className={styles.fieldLabel}>{label}</span>
      <button
        type="button"
        className={styles.selectControl}
        aria-label={`${label}, ${displayValue}`}
      >
        <span className={styles.selectValue}>{displayValue}</span>
        <span className={styles.chevron} aria-hidden="true">
          ›
        </span>
      </button>
    </div>
  );
}

type ProfileTextRowProps = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly autoComplete: string;
  readonly enterKeyHint: 'next' | 'done';
  readonly onChange: (value: string) => void;
};

function ProfileTextRow({
  id,
  label,
  value,
  autoComplete,
  enterKeyHint,
  onChange,
}: ProfileTextRowProps) {
  return (
    <div className={styles.row}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        value={value}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
