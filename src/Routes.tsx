import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import SubjectsEvaluation from './pages/SubjectsEvaluation';
import SubjectProfile from './pages/SubjectProfile';
import PerformanceOverview from './pages/PerformanceOverview';
import RecoveryCodeScreen from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryCodeScreen.tsx';
import { RoutePath } from 'types/router.ts';

const routes = [
  {
    path: RoutePath.LOGIN,
    element: <RecoveryCodeScreen />,
    header: {
      title: 'Login',
      icon: null,
      iconClicked: null,
    },
    requireAuth: false,
  },
  {
    path: RoutePath.DASHBOARD,
    element: <Dashboard />,
    header: {
      title: 'Dashboard',
      icon: null,
      iconClicked: null,
    },
    requireAuth: true,
  },
  {
    path: RoutePath.DOMAIN_OVERVIEW,
    element: <DomainOverview />,
    header: {
      title: 'Domain overview',
      icon: 'home',
      iconClicked: () => {
        window.location.href = '/';
      },
    },
    requireAuth: true,
  },
  {
    path: RoutePath.SUBJECTS_EVALUATION,
    element: <SubjectsEvaluation />,
    header: {
      title: 'Subjects evaluation',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
    requireAuth: true,
  },
  {
    path: RoutePath.SUBJECT_PROFILE,
    element: <SubjectProfile />,
    header: {
      title: 'Subject profile',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
    requireAuth: false,
  },
  {
    path: RoutePath.PERFORMANCE_OVERVIEW,
    element: <PerformanceOverview />,
    header: {
      title: 'Player performance overview',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
    requireAuth: true,
  },
];

export default routes;
