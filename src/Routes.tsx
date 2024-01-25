import Login from 'pages/Login';
import Splash from 'pages/Splash';
import { RoutePath } from 'types/router';

import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import Onboarding from './pages/Onboarding';
import PerformanceOverview from './pages/PerformanceOverview';
import SubjectProfile from './pages/SubjectProfile';

const routes = [
  {
    // Only used for demo
    path: RoutePath.SPLASH, // /splash
    pathRegex: new RegExp(/^\/splash/),
    element: <Splash />,
    noHeader: true,
    requireAuth: false,
  },
  {
    // Only used for demo
    path: RoutePath.ONBOARDING, // /onboardingRD, // /onboard
    pathRegex: new RegExp(/^\/onboard/),
    element: <Onboarding />,
    noHeader: true,
    requireAuth: true,
  },
  {
    path: RoutePath.LOGIN, // /
    pathRegex: new RegExp(/^\/$/),
    element: <Login />,
    noHeader: true,
    requireAuth: false,
  },
  {
    path: RoutePath.DASHBOARD, // /dashboard
    pathRegex: new RegExp(/^\/dashboard/),
    element: <Dashboard />,
    header: {
      title: 'Dashboard',
      icon: null,
    },
    requireAuth: true,
  },
  {
    path: RoutePath.DOMAIN_OVERVIEW, // /domain-overview
    pathRegex: new RegExp(/^\/domain-overview/),
    element: <DomainOverview />,
    header: {
      title: 'Domain overview',
      icon: '/assets/images/Header/home.svg',
    },
    requireAuth: true,
  },
  {
    path: RoutePath.SUBJECT_PROFILE, // /subject/:subjectId
    pathRegex: new RegExp(/^\/subject\/[a-zA-Z0-9_-]+/),
    element: <SubjectProfile />,
    header: {
      title: 'Subject profile',
      icon: '/assets/images/Header/back.svg',
    },
    requireAuth: false,
  },
  {
    path: RoutePath.HOME, // /performance-overview
    pathRegex: new RegExp(/^\/home/),
    element: <PerformanceOverview />,
    header: {
      title: 'Home',
      icon: '/assets/images/Dashboard/setting-icon.svg',
    },
    requireAuth: true,
  },
];

export default routes;
