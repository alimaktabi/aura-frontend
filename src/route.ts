import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import SubjectsEvaluation from './pages/SubjectsEvaluation';
import SubjectProfile from './pages/SubjectProfile';
import PerformanceOverview from './pages/PerformanceOverview';
import Login from "./pages/Login";

const routes = [
  {
    path: '/',
    element: Login,
    header: {
      title: 'Login',
      icon: null,
      iconClicked: null,
    },
  },
  {
    path: '/dashboard',
    element: Dashboard,
    header: {
      title: 'Dashboard',
      icon: null,
      iconClicked: null,
    },
  },
  {
    path: '/domain-overview',
    element: DomainOverview,
    header: {
      title: 'Domain overview',
      icon: 'home',
      iconClicked: () => {
        window.location.href = '/';
      },
    },
  },
  {
    path: '/subjects-evaluation',
    element: SubjectsEvaluation,
    header: {
      title: 'Subjects evaluation',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
  },
  {
    path: '/subject-profile',
    element: SubjectProfile,
    header: {
      title: 'Subject profile',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
  },
  {
    path: '/performance-overview',
    element: PerformanceOverview,
    header: {
      title: 'Player performance overview',
      icon: 'back',
      iconClicked: () => {
        return;
      }
    },
  }
];

export default routes;
