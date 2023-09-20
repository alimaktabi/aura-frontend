import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from 'Routes';
import { RoutePath } from 'types/router';

const Index = () => {
  // Todo: Implement route stack
  const location = useLocation();
  const currentRouteObject = useMemo(
    //TODO: this slice 5 is a hotfix for handling parameters
    () =>
      routes.find(
        (route) => route.path.slice(5) === location.pathname.slice(5),
      ),
    [location.pathname],
  );
  let headerComponent = currentRouteObject?.header;
  const navigate = useNavigate();
  const onIconClick = useCallback(() => {
    if (currentRouteObject?.path === RoutePath.SUBJECTS_EVALUATION)
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
    <header className="px-6 py-9 flex justify-between">
      <span className="header-left">
        <span className="header-title text-2xl text-white">
          {headerComponent.title}
        </span>
      </span>
      <span className="header-right flex items-center">
        {headerComponent.icon && (
          <span onClick={onIconClick} className="header-icon">
            <img className="w-6 h-6" src={headerComponent.icon} alt={''} />
          </span>
        )}
      </span>
    </header>
  );
};

export default Index;
