import {
  createEmptyCareerState,
  createEmptySlot,
  isCareerSlotId,
  type CareerSlotId,
  type CareerSlotRecord,
  type CareerSlots,
  type CareerState,
  type OccupiedCareerSlot,
  type ProfileDraft,
} from '@/core/career';
import { AppError, ErrorCategory, ErrorCode, reportError } from '@/core/errors';

export const CAREER_STORAGE_KEY = 'mfc.career-state';
export const CAREER_STORAGE_VERSION = 1;

type CareerStorageEnvelopeV1 = {
  readonly version: 1;
  readonly data: CareerState;
};

function reportStorageFailure(message: string, cause?: unknown): void {
  reportError(
    new AppError(message, {
      code: ErrorCode.STORAGE_FAILED,
      category: ErrorCategory.APPLICATION,
      cause,
    }),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch (cause) {
    reportStorageFailure('Career storage is unavailable.', cause);
    return null;
  }
}

function parseProfileDraft(value: unknown): ProfileDraft | null {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.firstName !== 'string' || typeof value.lastName !== 'string') {
    return null;
  }

  const preferredFoot = parseOptionalString(value.preferredFoot);
  const gender = parseOptionalString(value.gender);
  const position = parseOptionalString(value.position);
  const league = parseOptionalString(value.league);
  const nationality = parseOptionalString(value.nationality);

  if (
    preferredFoot === undefined ||
    gender === undefined ||
    position === undefined ||
    league === undefined ||
    nationality === undefined
  ) {
    return null;
  }

  return {
    firstName: value.firstName,
    lastName: value.lastName,
    preferredFoot,
    gender,
    position,
    league,
    nationality,
  };
}

function parseOptionalString(value: unknown): string | null | undefined {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return undefined;
}

function parseTimestamp(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function parseSlot(slotId: CareerSlotId, value: unknown): CareerSlotRecord {
  if (value === undefined) {
    return createEmptySlot(slotId);
  }

  if (!isRecord(value)) {
    reportStorageFailure(`Career slot ${String(slotId)} was malformed and was reset.`);
    return createEmptySlot(slotId);
  }

  if (value.status === 'empty') {
    return createEmptySlot(slotId);
  }

  if (value.status !== 'draft' && value.status !== 'established') {
    reportStorageFailure(`Career slot ${String(slotId)} was malformed and was reset.`);
    return createEmptySlot(slotId);
  }

  const profile = parseProfileDraft(value.profile);
  const createdAtMs = parseTimestamp(value.createdAtMs);
  const updatedAtMs = parseTimestamp(value.updatedAtMs);

  if (profile === null || createdAtMs === null || updatedAtMs === null) {
    reportStorageFailure(`Career slot ${String(slotId)} was malformed and was reset.`);
    return createEmptySlot(slotId);
  }

  const occupied: OccupiedCareerSlot = {
    slotId,
    status: value.status,
    profile,
    createdAtMs,
    updatedAtMs,
  };

  return occupied;
}

function parseSlots(value: unknown): CareerSlots {
  if (value !== undefined && !isRecord(value)) {
    throw new Error('Career storage slots are not an object.');
  }

  const record = value ?? {};

  return {
    1: parseSlot(1, record['1']),
    2: parseSlot(2, record['2']),
    3: parseSlot(3, record['3']),
  };
}

function parseCareerData(value: unknown): CareerState {
  if (!isRecord(value)) {
    throw new Error('Career storage data is not an object.');
  }

  const slots = parseSlots(value.slots);
  const candidateActiveSlotId =
    value.activeSlotId === null ? null : value.activeSlotId;

  if (candidateActiveSlotId !== null && !isCareerSlotId(candidateActiveSlotId)) {
    reportStorageFailure('Career storage active slot is invalid.');
  }

  const activeSlotId =
    candidateActiveSlotId !== null &&
    isCareerSlotId(candidateActiveSlotId) &&
    slots[candidateActiveSlotId].status !== 'empty'
      ? candidateActiveSlotId
      : null;

  return {
    slots,
    activeSlotId,
  };
}

export function parseCareerStorage(value: unknown): CareerState {
  if (!isRecord(value)) {
    throw new Error('Career storage root is not an object.');
  }

  switch (value.version) {
    case CAREER_STORAGE_VERSION:
      return parseCareerData(value.data);
    default:
      throw new Error('Unsupported career storage version.');
  }
}

export function loadCareerState(): CareerState {
  const storage = getStorage();
  if (storage === null) {
    return createEmptyCareerState();
  }

  try {
    const raw = storage.getItem(CAREER_STORAGE_KEY);
    if (raw === null || raw.trim() === '') {
      return createEmptyCareerState();
    }

    return parseCareerStorage(JSON.parse(raw) as unknown);
  } catch (cause) {
    reportStorageFailure(
      'Persisted career state was malformed and was reset.',
      cause,
    );
    return createEmptyCareerState();
  }
}

export function saveCareerState(state: CareerState): void {
  const storage = getStorage();
  if (storage === null) {
    return;
  }

  const envelope: CareerStorageEnvelopeV1 = {
    version: CAREER_STORAGE_VERSION,
    data: state,
  };

  try {
    storage.setItem(CAREER_STORAGE_KEY, JSON.stringify(envelope));
  } catch (cause) {
    reportStorageFailure('Failed to persist career state.', cause);
  }
}

export function clearPersistedCareerState(): void {
  const storage = getStorage();
  if (storage === null) {
    return;
  }

  try {
    storage.removeItem(CAREER_STORAGE_KEY);
  } catch (cause) {
    reportStorageFailure('Failed to clear career state.', cause);
  }
}
