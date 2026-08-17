import { AppErrorBoundary } from './AppErrorBoundary';
import { BootstrapScreen } from './BootstrapScreen';

export function App() {
  return (
    <AppErrorBoundary>
      <BootstrapScreen />
    </AppErrorBoundary>
  );
}
