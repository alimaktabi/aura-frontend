import Modal from 'components/Shared/Modal';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useSubjectEvaluationFromContext } from 'hooks/useSubjectEvaluation';
import EvaluateModalBody from 'pages/SubjectProfile/EvaluateModalBody';
import { useMemo, useState } from 'react';

export const YourEvaluationInfo = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const isYourEvaluation = true;
  const [isEvaluateNowModalOpen, setIsEvaluateNowModalOpen] = useState(false);
  const { name } = useSubjectBasicInfo(toSubjectId);

  const { rating, loading, confidenceValue } = useSubjectEvaluationFromContext({
    fromSubjectId,
    toSubjectId,
  });

  //TODO: get notes from api
  const styleValues = useMemo(() => {
    if (loading) {
      return {
        bgAndTextColor: 'bg-gray20 text-white',
        iconBgColor: 'bg-gray50',
        text: '...',
      };
    }
    if (rating?.rating) {
      if (Number(rating.rating) > 0)
        return {
          bgAndTextColor: 'bg-pl1',
          iconBgColor: 'bg-pl2',
          text: 'Positive',
        };
      if (Number(rating.rating) < 0)
        return {
          bgAndTextColor: 'bg-nl1',
          iconBgColor: 'bg-nl2',
          text: 'Negative',
        };
    }
    return {
      bgAndTextColor: 'bg-gray20 text-white',
      iconBgColor: 'bg-gray50',
      text: 'Not Rated',
    };
  }, [rating, loading]);

  if (loading)
    return (
      <div>
        <span className="font-medium">...</span>
      </div>
    );

  return (
    <div>
      <div
        className={`text-sm flex flex-1 justify-between rounded-md items-center h-[38px] p-1.5 ${
          styleValues.bgAndTextColor
        } ${isYourEvaluation ? 'p-1.5' : 'p-2.5'}`}
      >
        <div>
          <span
            className="font-medium"
            data-testid={`${
              isYourEvaluation ? 'your-' : ''
            }evaluation-${fromSubjectId}-${toSubjectId}-magnitude`}
          >
            {styleValues.text}
          </span>
          <span
            className="font-medium"
            data-testid={`${
              isYourEvaluation ? 'your-' : ''
            }evaluation-${fromSubjectId}-${toSubjectId}-confidence`}
          >
            {rating && Number(rating.rating) !== 0 && confidenceValue
              ? ` - ${confidenceValue}`
              : ''}
            {rating?.rating ? ` (${rating.rating})` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{'12%'}</span>
          {isYourEvaluation && (
            <div
              className={`p-1.5 rounded cursor-pointer ${styleValues.iconBgColor}`}
              data-testid={`your-evaluation-${fromSubjectId}-${toSubjectId}-edit`}
              onClick={() => setIsEvaluateNowModalOpen(true)}
            >
              <img
                src="/assets/images/Shared/edit-icon.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isEvaluateNowModalOpen}
        closeModalHandler={() => setIsEvaluateNowModalOpen(false)}
        title={`Endorsing ${name}`}
      >
        <EvaluateModalBody
          prevRating={rating?.rating ? Number(rating.rating) : undefined}
          subjectId={toSubjectId}
          onSubmitted={() => setIsEvaluateNowModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
