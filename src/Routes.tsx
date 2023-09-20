import RecoveryCodeScreen from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryCodeScreen';
import { RoutePath } from 'types/router';

import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import PerformanceOverview from './pages/PerformanceOverview';
import SubjectProfile from './pages/SubjectProfile';
import SubjectsEvaluation from './pages/SubjectsEvaluation';

const routes = [
  {
    path: RoutePath.LOGIN,
    element: <RecoveryCodeScreen />,
    header: {
      title: 'Login',
      icon: null,
    },
    requireAuth: false,
  },
  {
    path: RoutePath.DASHBOARD,
    element: <Dashboard />,
    header: {
      title: 'Dashboard',
      icon: null,
    },
    requireAuth: true,
  },
  {
    path: RoutePath.DOMAIN_OVERVIEW,
    element: <DomainOverview />,
    header: {
      title: 'Domain overview',
      icon: '/assets/images/Header/home.svg',
    },
    requireAuth: true,
  },
  {
    path: RoutePath.SUBJECTS_EVALUATION,
    element: <SubjectsEvaluation />,
    header: {
      title: 'Subjects evaluation',
      icon: '/assets/images/Dashboard/setting-icon.svg',
    },
    requireAuth: true,
  },
  {
    path: RoutePath.SUBJECT_PROFILE,
    element: <SubjectProfile />,
    header: {
      title: 'Subject profile',
      icon: '/assets/images/Header/back.svg',
    },
    requireAuth: false,
  },
  {
    path: RoutePath.PERFORMANCE_OVERVIEW,
    element: <PerformanceOverview />,
    header: {
      title: 'Player performance overview',
      icon: '/assets/images/Header/home.svg',
    },
    requireAuth: true,
  },
];

export default routes;
