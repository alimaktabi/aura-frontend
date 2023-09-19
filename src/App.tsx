import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'Routes';
import { RoutePath } from 'types/router';

import Index from './components/Header';
import { selectIsLoggedIn } from './store/profile/selectors';

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
  return (
    <div className="app">
      <Index />
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
  );
}

export default App;
