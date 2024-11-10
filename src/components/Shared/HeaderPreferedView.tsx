import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import * as React from 'react';

import {
  getViewModeBackgroundColorClass,
  preferredViewIcon,
  subjectViewAsIcon,
  viewModeSubjectBackgroundColorClass,
} from '../../constants';
import useViewMode from '../../hooks/useViewMode';
import { EvaluationCategory, PreferredView } from '../../types/dashboard';

const views = [
  EvaluationCategory.SUBJECT,
  EvaluationCategory.PLAYER,
  EvaluationCategory.TRAINER,
  EvaluationCategory.MANAGER,
];

export const HeaderPreferedView = {
  ProfileHeaderViews: ({ subjectId }: { subjectId: string }) => {
    const { updateViewAs, currentViewMode, currentEvaluationCategory } =
      useViewMode();

    const playerEvaluation = useSubjectVerifications(
      subjectId,
      EvaluationCategory.PLAYER,
    );

    const trainerEvaluation = useSubjectVerifications(
      subjectId,
      EvaluationCategory.TRAINER,
    );

    const managerEvaluation = useSubjectVerifications(
      subjectId,
      EvaluationCategory.MANAGER,
    );

    const authorizedTabs = React.useMemo(() => {
      const tabs = [EvaluationCategory.SUBJECT];

      if (playerEvaluation.auraLevel && playerEvaluation.auraLevel > 0)
        tabs.push(EvaluationCategory.PLAYER);

      if (trainerEvaluation.auraLevel && trainerEvaluation.auraLevel > 0)
        tabs.push(EvaluationCategory.TRAINER);

      if (managerEvaluation.auraLevel && managerEvaluation.auraLevel > 0)
        tabs.push(EvaluationCategory.MANAGER);

      return tabs;
    }, [playerEvaluation, trainerEvaluation, managerEvaluation]);

    const isLoading =
      managerEvaluation.loading ||
      trainerEvaluation.loading ||
      playerEvaluation.loading;

    return (
      <>
        {isLoading
          ? views.map((_, key) => (
              <div
                key={key}
                className={`p-1 rounded animate-pulse bg-gray100 ml-2 cursor-pointer`}
              >
                <div className="w-4 h-4"></div>
              </div>
            ))
          : authorizedTabs.map((subjectViewMode) => (
              <div
                className={`p-1 rounded ${
                  currentEvaluationCategory === subjectViewMode
                    ? viewModeSubjectBackgroundColorClass[currentViewMode]
                    : 'bg-gray100'
                } ml-2 cursor-pointer`}
                key={subjectViewMode}
                onClick={() => updateViewAs(subjectViewMode)}
              >
                <img
                  className="w-4 h-4"
                  src={subjectViewAsIcon[subjectViewMode]}
                  alt=""
                />
              </div>
            ))}
      </>
    );
  },
  PreferedView: () => {
    const { currentViewMode, setPreferredView } = useViewMode();

    return (
      <>
        <div
          className={`p-1 rounded ${
            currentViewMode === PreferredView.PLAYER
              ? getViewModeBackgroundColorClass(currentViewMode)
              : 'bg-gray100'
          } ml-2 cursor-pointer`}
          onClick={() => setPreferredView(PreferredView.PLAYER)}
        >
          <img
            className="w-4 h-4"
            src={preferredViewIcon[PreferredView.PLAYER]}
            alt=""
          />
        </div>
        <div
          className={`p-1 rounded ${
            currentViewMode === PreferredView.TRAINER
              ? getViewModeBackgroundColorClass(currentViewMode)
              : 'bg-gray100'
          } ml-2 cursor-pointer`}
          onClick={() => setPreferredView(PreferredView.TRAINER)}
        >
          <img
            className="w-4 h-4"
            src={preferredViewIcon[PreferredView.TRAINER]}
            alt=""
          />
        </div>
        <div
          className={`p-1 rounded ${
            currentViewMode === PreferredView.MANAGER_EVALUATING_TRAINER ||
            currentViewMode === PreferredView.MANAGER_EVALUATING_MANAGER
              ? getViewModeBackgroundColorClass(currentViewMode)
              : 'bg-gray100'
          } ml-2 cursor-pointer`}
          onClick={() =>
            setPreferredView(PreferredView.MANAGER_EVALUATING_TRAINER)
          }
        >
          <img
            className="w-4 h-4"
            src={preferredViewIcon[PreferredView.MANAGER_EVALUATING_TRAINER]}
            alt=""
          />
        </div>
      </>
    );
  },
};
