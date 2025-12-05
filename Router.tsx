import { useEffect, useState } from 'react';
import { LandingPage } from './LandingPage';
import { AppPage } from './AppPage';
import { OperationsFeaturePage } from './OperationsFeaturePage';
import { AppointmentsFeaturePage } from './AppointmentsFeaturePage';
import { DocumentsFeaturePage } from './DocumentsFeaturePage';
import { TrackingFeaturePage } from './TrackingFeaturePage';
import { ReportsFeaturePage } from './ReportsFeaturePage';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setCurrentPath(window.location.pathname);
    };

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        if (url.pathname !== currentPath) {
          e.preventDefault();
          window.history.pushState({}, '', anchor.href);
          setCurrentPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [currentPath]);

  if (currentPath.startsWith('/app')) {
    return <AppPage />;
  }

  if (currentPath === '/features/operations') {
    return <OperationsFeaturePage />;
  }

  if (currentPath === '/features/appointments') {
    return <AppointmentsFeaturePage />;
  }

  if (currentPath === '/features/documents') {
    return <DocumentsFeaturePage />;
  }

  if (currentPath === '/features/tracking') {
    return <TrackingFeaturePage />;
  }

  if (currentPath === '/features/reports') {
    return <ReportsFeaturePage />;
  }

  return <LandingPage />;
}
