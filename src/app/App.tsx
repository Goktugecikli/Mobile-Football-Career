import { AppErrorBoundary } from './AppErrorBoundary';
import { AppShell } from './AppShell';
import { AppRouter } from './routing/AppRouter';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AppShell>
          <AppRouter />
        </AppShell>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
