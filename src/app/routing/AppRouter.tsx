import { CareerSelectScreen } from '@/features/careerSelect/CareerSelectScreen';
import { EntryScreen } from '@/features/entry/EntryScreen';
import { GameHomeScreen } from '@/features/gameHome/GameHomeScreen';
import { InitialTrainingScreen } from '@/features/initialTraining/InitialTrainingScreen';
import { MatchEntryScreen } from '@/features/matchEntry/MatchEntryScreen';
import { MatchPreparationScreen } from '@/features/matchPreparation/MatchPreparationScreen';
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
      <Route path={appPaths.gameHome} element={<GameHomeScreen />} />
      <Route path={appPaths.matchEntry} element={<MatchEntryScreen />} />
      <Route
        path={appPaths.matchPreparation}
        element={<MatchPreparationScreen />}
      />
    </Routes>
  );
}
