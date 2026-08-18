export const appPaths = {
  entry: '/',
  careerSelect: '/career-select',
  profileCreate: '/profile-create',
  initialTraining: '/initial-training',
  teamAssignment: '/team-assignment',
  gameHome: '/game-home',
  matchEntry: '/match-entry',
  matchPreparation: '/match-preparation',
} as const;

export type CareerOnboardingState = {
  readonly slotNumber: 1 | 2 | 3;
};
