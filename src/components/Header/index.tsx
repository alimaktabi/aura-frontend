import { useLocation } from 'react-router-dom';
import routes from '../../route.ts';

const Index = () => {
  // Todo: Implement route stack
  const location = useLocation();

  let headerComponent = routes.find(
    (route) => route.path === location.pathname,
  )?.header;

  if (!headerComponent) {
    headerComponent = {
      title: '',
      icon: 'back',
      iconClicked: () => {
        window.history.back();
      },
    };
  }

  return (
    <header className="px-6 py-9 flex justify-between">
      <span className="header-left">
        <span className="header-title text-2xl text-white">
          {headerComponent.title}
        </span>
      </span>
      <span className="header-right">
        {headerComponent.icon && headerComponent.iconClicked && (
          <span onClick={headerComponent.iconClicked} className="header-icon">
            <img
              className="w-6 h-6"
              onClick={headerComponent.iconClicked}
              src={'/assets/images/Header/' + headerComponent.icon + '.svg'}
              alt={''}
            />
          </span>
        )}
      </span>
    </header>
  );
};

export default Index;
