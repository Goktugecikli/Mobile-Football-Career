import { CareerSelectScreen } from '@/features/careerSelect/CareerSelectScreen';
import { EntryScreen } from '@/features/entry/EntryScreen';
import { InitialTrainingScreen } from '@/features/initialTraining/InitialTrainingScreen';
import { ProfileCreateScreen } from '@/features/profileCreate/ProfileCreateScreen';
import { TeamAssignmentScreen } from '@/features/teamAssignment/TeamAssignmentScreen';
import { appPaths } from '@/app/routing/appPaths';
import { Route, Routes } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path={appPaths.entry} element={<EntryScreen />} />
      <Route path={appPaths.careerSelect} element={<CareerSelectScreen />} />
      <Route path={appPaths.profileCreate} element={<ProfileCreateScreen />} />
      <Route
        path={appPaths.initialTraining}
        element={<InitialTrainingScreen />}
      />
      <Route
        path={appPaths.teamAssignment}
        element={<TeamAssignmentScreen />}
      />
    </Routes>
  );
}
