import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import routes from 'Routes';
import { RoutePath } from 'types/router';

import Header from './components/Header';
import {
  selectIsLoggedIn,
  selectPlayerOnboardingScreenShown,
} from './store/profile/selectors';

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const userIsLogged = useSelector(selectIsLoggedIn); // Your hook to get login status
  if (!userIsLogged) {
    return (
      <Navigate
        to={{
          pathname: RoutePath.LOGIN,
          search: `next=${encodeURIComponent(
            window.location.href.slice(window.location.origin.length),
          )}`,
        }}
        replace
      />
    );
  }
  return children;
};

function App() {
  const location = useLocation();
  const currentRouteObject = useMemo(
    () => routes.find((route) => route.pathRegex.test(location.pathname)),
    [location.pathname],
  );

  //TODO: remove these hardcodes after a stable release
  const playerOnboardingScreenShown = useSelector(
    selectPlayerOnboardingScreenShown,
  );
  const { myRatings } = useMyEvaluationsContext();
  const isPlayerOnboarding =
    location.pathname === RoutePath.SUBJECTS_EVALUATION &&
    myRatings?.length === 0 &&
    !playerOnboardingScreenShown;
  const hasDarkBackground =
    location.pathname === RoutePath.LOGIN ||
    location.pathname === RoutePath.SPLASH ||
    location.pathname === RoutePath.ONBOARDING ||
    isPlayerOnboarding;

  const noHeader = currentRouteObject?.noHeader || isPlayerOnboarding;

  return (
    <div
      className={`app_container ${hasDarkBackground && 'app_container__dark'}`}
    >
      <div className="app">
        {!noHeader && <Header />}
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={
                route.requireAuth ? (
                  <RequireAuth>{route.element}</RequireAuth>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
