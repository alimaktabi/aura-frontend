import RecoveryCodeScreen from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryCodeScreen';
import { RoutePath } from 'types/router';

import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import PerformanceOverview from './pages/PerformanceOverview';
import SubjectProfile from './pages/SubjectProfile';
import SubjectsEvaluation from './pages/SubjectsEvaluation';

const routes = [
  {
    path: RoutePath.LOGIN, // /
    pathRegex: new RegExp(/^\/$/),
    element: <RecoveryCodeScreen />,
    header: {
      title: 'Login',
      icon: null,
    },
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
    path: RoutePath.SUBJECTS_EVALUATION, // /subjects-evaluation
    pathRegex: new RegExp(/^\/subjects-evaluation/),
    element: <SubjectsEvaluation />,
    header: {
      title: 'Subjects evaluation',
      icon: '/assets/images/Dashboard/setting-icon.svg',
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
    path: RoutePath.PERFORMANCE_OVERVIEW, // /performance-overview
    pathRegex: new RegExp(/^\/performance-overview/),
    element: <PerformanceOverview />,
    header: {
      title: 'Player performance overview',
      icon: '/assets/images/Header/home.svg',
    },
    requireAuth: true,
  },
];

export default routes;
