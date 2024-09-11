import { useEffect, useMemo, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import routes from 'Routes';
import { RoutePath } from 'types/router';
import { findLastIndex } from 'utils/index';

import useViewMode from '../../hooks/useViewMode';
import { PlayerHistorySequenceType } from '../../types';
import { PlayerHistorySequence } from './PlayerHistorySequence';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentRouteObject = useMemo(
    () => routes.find((route) => route.pathRegex.test(pathname)),
    [pathname],
  );

  const [playerHistorySequence, setPlayerHistorySequence] = useState<
    PlayerHistorySequenceType[]
  >([]);
  const [isSequenceOpen, setIsSequenceOpen] = useState(false);

  const { currentEvaluationCategory } = useViewMode();

  useEffect(() => {
    const subjectIdProp = matchPath(RoutePath.SUBJECT_PROFILE, pathname)?.params
      .subjectIdProp;
    console.log({ subjectIdProp });
    if (!subjectIdProp) return;
    setPlayerHistorySequence((prevSequence) => {
      if (
        findLastIndex(prevSequence, (h) => h.subjectId === subjectIdProp) ===
        prevSequence.length - 1
      ) {
        return [
          ...prevSequence.slice(0, prevSequence.length - 1),
          {
            subjectId: subjectIdProp,
            evaluationCategory: currentEvaluationCategory,
          },
        ];
      }
      const index = findLastIndex(
        prevSequence,
        (h) =>
          h.subjectId === subjectIdProp &&
          h.evaluationCategory === currentEvaluationCategory,
      );
      if (index === -1) {
        return [
          ...prevSequence,
          {
            subjectId: subjectIdProp,
            evaluationCategory: currentEvaluationCategory,
          },
        ];
      }
      return prevSequence.slice(0, index + 1);
    });
  }, [currentEvaluationCategory, pathname]);

  let headerComponent: any;

  if (currentRouteObject) {
    headerComponent = currentRouteObject.header;
  } else {
    headerComponent = {
      title: <></>,
      icon: '/assets/images/Header/home.svg',
      iconClickedHandler: () => {
        navigate(RoutePath.HOME);
      },
    };
  }

  return (
    <div className="flex flex-col gap-2.5 px-6 pt-9">
      {isSequenceOpen && (
        <PlayerHistorySequence playerHistorySequence={playerHistorySequence} />
      )}
      <header className="header pb-4 flex justify-between">
        <div className="header-left items-center flex gap-1.5">
          <span
            key={headerComponent.icon}
            onClick={() =>
              headerComponent && headerComponent.iconClickedHandler(navigate)
            }
            className="header-icon !cursor-pointer mr-0.5"
            data-testid="nav-button"
          >
            <img
              key={headerComponent.icon}
              className="w-6 h-6"
              src={headerComponent.icon}
              alt={''}
            />
          </span>
          {playerHistorySequence.length !== 0 && (
            <img
              className="cursor-pointer w-6 h-[18px]"
              src={
                isSequenceOpen
                  ? '/assets/images/Header/close-sequence.svg'
                  : '/assets/images/Header/sequence.svg'
              }
              alt=""
              onClick={() => setIsSequenceOpen(!isSequenceOpen)}
            />
          )}
          <div className="header-title font-medium text-2xl text-white whitespace-nowrap flex items-center">
            {headerComponent.title}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
