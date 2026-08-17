import { AppErrorBoundary } from './AppErrorBoundary';
import { AppShell } from './AppShell';
import { BootstrapScreen } from './BootstrapScreen';

export function App() {
  return (
    <AppErrorBoundary>
      <AppShell>
        <BootstrapScreen />
      </AppShell>
    </AppErrorBoundary>
  );
}
