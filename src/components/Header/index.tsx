import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from 'Routes';
import { RoutePath } from 'types/router';

import { PlayerHistorySequence } from './PlayerHistorySequence';

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

  const [hasSequence] = useState(true);
  const [isSequenceOpen, setIsSequenceOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 px-6 pt-9">
      {hasSequence && isSequenceOpen && <PlayerHistorySequence />}
      <header className="header pb-4 flex justify-between">
        <div className="header-left flex gap-1.5">
          {hasSequence && (
            <img
              src={
                isSequenceOpen
                  ? '/assets/images/Header/close-sequence.svg'
                  : '/assets/images/Header/sequence.svg'
              }
              alt=""
              onClick={() => setIsSequenceOpen(!isSequenceOpen)}
            />
          )}
          <span className="header-title font-medium text-2xl text-white">
            {headerComponent.title}
          </span>
        </div>
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
    </div>
  );
};

export default Header;
