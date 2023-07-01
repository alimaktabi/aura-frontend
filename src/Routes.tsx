import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import SubjectsEvaluation from './pages/SubjectsEvaluation';
import SubjectProfile from './pages/SubjectProfile';
import PerformanceOverview from './pages/PerformanceOverview';
import Login from './pages/Login';

export enum RoutePath {
  LOGIN = '/',
  DASHBOARD = '/dashboard',
}

const routes = [
  {
    path: RoutePath.LOGIN,
    element: <Login />,
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
    path: '/domain-overview',
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
    path: '/subjects-evaluation',
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
    path: '/subject-profile/:id',
    element: <SubjectProfile />,
    header: {
      title: 'Subject profile',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
    requireAuth: true,
  },
  {
    path: '/performance-overview',
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
