import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useHashRoute(): [string, (p: string) => void] {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const navigate = React.useCallback((p: string) => nav(p), [nav]);
  return [pathname, navigate];
}
