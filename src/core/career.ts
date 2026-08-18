export const CAREER_SLOT_IDS = [1, 2, 3] as const;

export type CareerSlotId = (typeof CAREER_SLOT_IDS)[number];

export type CareerSlotStatus = 'empty' | 'draft' | 'established';

export type ProfileDraft = {
  readonly firstName: string;
  readonly lastName: string;
  readonly preferredFoot: string | null;
  readonly gender: string | null;
  readonly position: string | null;
  readonly league: string | null;
  readonly nationality: string | null;
};

export type EmptyCareerSlot = {
  readonly slotId: CareerSlotId;
  readonly status: 'empty';
};

export type OccupiedCareerSlot = {
  readonly slotId: CareerSlotId;
  readonly status: 'draft' | 'established';
  readonly profile: ProfileDraft;
  readonly createdAtMs: number;
  readonly updatedAtMs: number;
};

export type CareerSlotRecord = EmptyCareerSlot | OccupiedCareerSlot;

export type CareerSlots = {
  readonly 1: CareerSlotRecord;
  readonly 2: CareerSlotRecord;
  readonly 3: CareerSlotRecord;
};

export type CareerState = {
  readonly slots: CareerSlots;
  readonly activeSlotId: CareerSlotId | null;
};

export function isCareerSlotId(value: unknown): value is CareerSlotId {
  return value === 1 || value === 2 || value === 3;
}

export function createEmptyProfileDraft(): ProfileDraft {
  return {
    firstName: '',
    lastName: '',
    preferredFoot: null,
    gender: null,
    position: null,
    league: null,
    nationality: null,
  };
}

export function createEmptySlot(slotId: CareerSlotId): EmptyCareerSlot {
  return {
    slotId,
    status: 'empty',
  };
}

export function createDraftSlot(
  slotId: CareerSlotId,
  nowMs: number,
): OccupiedCareerSlot {
  return {
    slotId,
    status: 'draft',
    profile: createEmptyProfileDraft(),
    createdAtMs: nowMs,
    updatedAtMs: nowMs,
  };
}

export function createEmptyCareerState(): CareerState {
  return {
    slots: {
      1: createEmptySlot(1),
      2: createEmptySlot(2),
      3: createEmptySlot(3),
    },
    activeSlotId: null,
  };
}
