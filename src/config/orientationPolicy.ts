/**
 * Authoritative orientation policy location.
 *
 * No product orientation lock is defined yet. Native platform defaults from
 * Capacitor generation remain in effect until a task explicitly sets a lock
 * here and in the corresponding native configuration.
 */
export type OrientationPolicyStatus = 'unset';

export const orientationPolicy = {
  status: 'unset' as OrientationPolicyStatus,
} as const;
