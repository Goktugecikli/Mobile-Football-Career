import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/app/AppShell';
import { BootstrapScreen } from '@/app/BootstrapScreen';
import { NotFoundScreen } from '@/app/NotFoundScreen';
import { appPaths } from '@/app/routing/appPaths';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path={appPaths.bootstrap} element={<BootstrapScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
