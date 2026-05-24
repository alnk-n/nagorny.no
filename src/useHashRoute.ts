// useHashRoute.ts — React hook for hash-based routing.

import * as React from 'react';

export function useHashRoute(): [string, (p: string) => void] {
  const [hash, setHash] = React.useState<string>(() => window.location.hash.slice(1) || '/');
  React.useEffect(() => {
    const on = () => setHash(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const navigate = React.useCallback((p: string) => {
    window.location.hash = p;
  }, []);
  return [hash, navigate];
}
