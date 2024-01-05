import { PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING } from 'constants/index';
import { useBrowserHistoryContext } from 'contexts/BrowserHistoryContext';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'types/router';

const NewPlayerGuideAfterEvaluation = ({
  ratingsDoneCount,
  closeModalHandler,
}: {
  ratingsDoneCount: number | null;
  closeModalHandler?: () => void;
}) => {
  const navigate = useNavigate();
  const { isFirstVisitedRoute } = useBrowserHistoryContext();

  if (ratingsDoneCount === null) return null;
  return ratingsDoneCount < PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING ? (
    <div>
      <div className="mt-36 text-center text-xl">
        <p className="font-semibold">Great job!</p>
        <p>
          You&apos;ve just completed{' '}
          {ratingsDoneCount === 1 ? 'your first' : 'an'} evaluation. You need{' '}
          {PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING - ratingsDoneCount}{' '}
          more before you can start getting feedback by Aura trainers
        </p>
        <div className="grow bg-[#D9D9D9] rounded-xl h-[14px] overflow-hidden mt-[20px]">
          <span
            className={`flex bg-pastel-purple h-[inherit] rounded-xl w-[${Math.ceil(
              (ratingsDoneCount * 100) /
                PLAYER_EVALUATION_MINIMUM_COUNT_BEFORE_TRAINING,
            )}%]`}
          ></span>
        </div>
      </div>
      <div className="mt-36">
        <button
          data-testid="evaluation-onboarding-action-button"
          className="btn btn--big w-full"
          onClick={() => {
            if (isFirstVisitedRoute) {
              navigate(RoutePath.SUBJECTS_EVALUATION);
            } else {
              navigate(-1);
            }
          }}
        >
          Find More Subjects
        </button>
      </div>
    </div>
  ) : (
    <div>
      <div className="mt-36 text-center text-xl">
        <p className="font-semibold">Great job!</p>
        <p>
          You completed {ratingsDoneCount} evaluations. Start getting feedback
          by Aura trainers!
        </p>
        <div className="grow bg-[#D9D9D9] rounded-xl h-[14px] overflow-hidden mt-[20px]">
          <span
            className={`flex bg-pastel-purple h-[inherit] rounded-xl w-full`}
          ></span>
        </div>
      </div>
      <div className="mt-36">
        <button
          data-testid="submit-evaluation"
          className="btn btn--big w-full"
          onClick={() => {
            closeModalHandler?.();
            navigate(RoutePath.PERFORMANCE_OVERVIEW);
          }}
        >
          Find Trainers
        </button>
      </div>
    </div>
  );
};

export default NewPlayerGuideAfterEvaluation;
