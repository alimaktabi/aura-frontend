import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { RoutePath } from 'types/router';

export default function useRedirectAfterLogin() {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [query] = useSearchParams();
  const redirectAfterLogin = useCallback(() => {
    if (routerLocation.pathname === RoutePath.LOGIN) {
      const next = query.get('next');
      navigate(next ?? RoutePath.SUBJECTS_EVALUATION, { replace: true });
    }
  }, [routerLocation.pathname, navigate, query]);
  return redirectAfterLogin;
}
