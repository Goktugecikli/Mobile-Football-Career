import { CareerSelectScreen } from '@/features/careerSelect/CareerSelectScreen';
import { EntryScreen } from '@/features/entry/EntryScreen';
import { appPaths } from '@/app/routing/appPaths';
import { Route, Routes } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path={appPaths.entry} element={<EntryScreen />} />
      <Route path={appPaths.careerSelect} element={<CareerSelectScreen />} />
    </Routes>
  );
}
