import Login from 'pages/Login';
import Splash from 'pages/Splash';
import { RoutePath } from 'types/router';

import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import SubjectProfile from './pages/SubjectProfile';

const routes = [
  {
    // Only used for demo
    path: RoutePath.SPLASH,
    pathRegex: new RegExp(/^\/splash/),
    element: <Splash />,
    noHeader: true,
    requireAuth: false,
  },
  {
    // Only used for demo
    path: RoutePath.ONBOARDING,
    pathRegex: new RegExp(/^\/onboard/),
    element: <Onboarding />,
    noHeader: true,
    requireAuth: true,
  },
  {
    path: RoutePath.LOGIN,
    pathRegex: new RegExp(/^\/$/),
    element: <Login />,
    noHeader: true,
    requireAuth: false,
  },
  {
    path: RoutePath.DASHBOARD,
    pathRegex: new RegExp(/^\/dashboard/),
    element: <Dashboard />,
    header: {
      title: 'Dashboard',
      icon: null,
    },
    requireAuth: true,
  },
  {
    path: RoutePath.DOMAIN_OVERVIEW,
    pathRegex: new RegExp(/^\/domain-overview/),
    element: <DomainOverview />,
    header: {
      title: 'Domain overview',
      icon: '/assets/images/Header/home.svg',
    },
    requireAuth: true,
  },
  {
    path: RoutePath.SUBJECT_PROFILE,
    pathRegex: new RegExp(/^\/subject\/[a-zA-Z0-9_-]+/),
    element: <SubjectProfile />,
    header: {
      title: 'Subject profile',
      icon: '/assets/images/Header/menu.svg',
    },
    requireAuth: false,
  },
  {
    path: RoutePath.HOME,
    pathRegex: new RegExp(/^\/home/),
    element: <Home />,
    header: {
      title: 'Home',
      icon: '/assets/images/Header/menu.svg',
    },
    requireAuth: true,
  },
];

export default routes;
