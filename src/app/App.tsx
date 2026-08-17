import { AppErrorBoundary } from './AppErrorBoundary';
import { AppRouter } from './routing/AppRouter';

export function App() {
  return (
    <AppErrorBoundary>
      <AppRouter />
    </AppErrorBoundary>
  );
}
