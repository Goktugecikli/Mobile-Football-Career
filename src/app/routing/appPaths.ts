export const appPaths = {
  entry: '/',
  careerSelect: '/career-select',
  profileCreate: '/profile-create',
  initialTraining: '/initial-training',
  teamAssignment: '/team-assignment',
} as const;

export type CareerOnboardingState = {
  readonly slotNumber: 1 | 2 | 3;
};
