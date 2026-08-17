import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { appConfig } from '@/config/appConfig';
import { AppError, ErrorCategory, ErrorCode } from '@/core/errors';
import '@/styles/global.css';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new AppError('Root element "#root" was not found.', {
    code: ErrorCode.UNKNOWN,
    category: ErrorCategory.APPLICATION,
  });
}

document.title = appConfig.appName;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
