import Dashboard from './pages/Dashboard';
import DomainOverview from './pages/DomainOverview';

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
];

export default routes;
