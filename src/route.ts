import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';
import SubjectsEvaluation from './pages/SubjectsEvaluation';

const routes = [
  {
    path: '/',
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
      title: 'Domain Overview',
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
      title: 'Subjects Evaluation',
      icon: 'back',
      iconClicked: () => {
        return;
      },
    },
  },
];

export default routes;
