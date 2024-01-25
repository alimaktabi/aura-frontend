import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from 'Routes';
import { RoutePath } from 'types/router';

const Header = () => {
  const location = useLocation();
  const currentRouteObject = useMemo(
    () => routes.find((route) => route.pathRegex.test(location.pathname)),
    [location.pathname],
  );

  let headerComponent = currentRouteObject?.header;

  const navigate = useNavigate();
  const onIconClick = useCallback(() => {
    if (currentRouteObject?.path === RoutePath.HOME)
      navigate(RoutePath.DASHBOARD);
    else navigate(-1);
  }, [currentRouteObject, navigate]);

  if (!headerComponent) {
    headerComponent = {
      title: '',
      icon: '/assets/images/Header/back.svg',
    };
  }

  return (
    <header className="header px-6 py-9 flex justify-between">
      <span className="header-left">
        <span className="header-title text-2xl text-white">
          {headerComponent.title}
        </span>
      </span>
      <span className="header-right flex items-center">
        {headerComponent.icon && (
          <span
            onClick={onIconClick}
            className="header-icon !cursor-pointer"
            data-testid="nav-button"
          >
            <img className="w-6 h-6" src={headerComponent.icon} alt={''} />
          </span>
        )}
      </span>
    </header>
  );
};

export default Header;
