import {
  createDraftSlot,
  type CareerSlotId,
  type CareerState,
  type ProfileDraft,
} from '@/core/career';
import { loadCareerState, saveCareerState } from '@/shared/career/careerPersistence';
import { create } from 'zustand';

export type CareerStore = CareerState & {
  readonly activateSlot: (slotId: CareerSlotId) => void;
  readonly updateProfileDraft: (patch: Partial<ProfileDraft>) => void;
};

function persist(state: CareerState): void {
  saveCareerState({
    slots: state.slots,
    activeSlotId: state.activeSlotId,
  });
}

export const useCareerStore = create<CareerStore>()((set, get) => ({
  ...loadCareerState(),

  activateSlot(slotId) {
    const current = get().slots[slotId];
    const nextState: CareerState = {
      activeSlotId: slotId,
      slots:
        current.status === 'empty'
          ? {
              ...get().slots,
              [slotId]: createDraftSlot(slotId, Date.now()),
            }
          : get().slots,
    };

    set(nextState);
    persist(nextState);
  },

  updateProfileDraft(patch) {
    const { activeSlotId, slots } = get();
    if (activeSlotId === null) {
      return;
    }

    const current = slots[activeSlotId];
    if (current.status === 'empty') {
      return;
    }

    const nextState: CareerState = {
      activeSlotId,
      slots: {
        ...slots,
        [activeSlotId]: {
          ...current,
          profile: {
            ...current.profile,
            ...patch,
          },
          updatedAtMs: Date.now(),
        },
      },
    };

    set(nextState);
    persist(nextState);
  },
}));

export function selectActiveSlotId(state: CareerStore): CareerSlotId | null {
  return state.activeSlotId;
}

export function selectSlot(slotId: CareerSlotId) {
  return (state: CareerStore) => state.slots[slotId];
}

export function selectActiveProfile(state: CareerStore): ProfileDraft | null {
  if (state.activeSlotId === null) {
    return null;
  }

  const slot = state.slots[state.activeSlotId];
  return slot.status === 'empty' ? null : slot.profile;
}
