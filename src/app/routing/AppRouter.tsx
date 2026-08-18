import { CareerSelectScreen } from '@/features/careerSelect/CareerSelectScreen';
import { EntryScreen } from '@/features/entry/EntryScreen';
import { Route, Routes } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<EntryScreen />} />
      <Route path="/career-select" element={<CareerSelectScreen />} />
    </Routes>
  );
}
