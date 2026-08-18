import { appPaths } from '@/app/routing/appPaths';
import { selectActiveSlotId, useCareerStore } from '@/shared/career/careerStore';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export type RequireActiveCareerProps = {
  readonly children: ReactNode;
};

export function RequireActiveCareer({ children }: RequireActiveCareerProps) {
  const activeSlotId = useCareerStore(selectActiveSlotId);

  if (activeSlotId === null) {
    return <Navigate to={appPaths.careerSelect} replace />;
  }

  return children;
}
