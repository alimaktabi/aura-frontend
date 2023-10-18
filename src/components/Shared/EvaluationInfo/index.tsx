import Modal from 'components/Shared/Modal';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import EvaluateModalBody from 'pages/SubjectProfile/EvaluateModalBody';
import { useMemo, useState } from 'react';

import { useSubjectRating } from '../../../hooks/useSubjectRating';

export const EvaluationInfo = ({
  fromSubjectId,
  toSubjectId,
  isYourEvaluation = false,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  isYourEvaluation?: boolean;
}) => {
  const [isEvaluateNowModalOpen, setIsEvaluateNowModalOpen] = useState(false);
  const { name } = useSubjectBasicInfo(toSubjectId);

  const { rating, loading, confidenceValue } = useSubjectRating({
    fromSubjectId,
    toSubjectId,
  });

  //TODO: get notes from api
  const notes = '';
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
  return (
    <div>
      {Math.random() > 0.5 ? (
        <div className="flex gap-1 items-center text-sm">
          <div
            className={`p-2.5 rounded-md h-[38px] w-[38px] ${
              !notes ? 'bg-gray50' : styleValues.iconBgColor
            }`}
          >
            <img
              src={`${
                notes
                  ? '/assets/images/Shared/note-icon-white.svg'
                  : '/assets/images/Shared/note-icon-gray.svg'
              }`}
              alt=""
            />
          </div>
          <div
            className={`flex flex-1 justify-between rounded-md items-center h-[38px] p-1.5 ${
              styleValues.bgAndTextColor
            } ${isYourEvaluation ? 'p-1.5' : 'p-2.5'}`}
          >
            {loading ? (
              <div>
                <span className="font-medium">...</span>
              </div>
            ) : (
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
                  className="font-bold"
                  data-testid={`${
                    isYourEvaluation ? 'your-' : ''
                  }evaluation-${fromSubjectId}-${toSubjectId}-confidence`}
                >
                  {rating && Number(rating.rating) !== 0 && confidenceValue
                    ? ` - ${confidenceValue}`
                    : ''}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium">{rating?.rating ?? ''}</span>
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
          <div className="bg-pastel-purple p-2 rounded-md flex items-center justify-center w-[38px] h-[38px]">
            <img
              src="/assets/images/Shared/more-icon.svg"
              alt=""
              className="w-6 h-6"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <img src="/assets/images/Shared/brightid-icon.svg" alt="" />
          <p className="text-black text-sm font-medium">BrightID Connection:</p>
          <div className="flex rounded bg-soft-bright justify-evenly w-[55px] h-6 items-center">
            <img
              src="/assets/images/Shared/left-arrow.svg"
              className="w-3.5 h-3.5"
              alt=""
            />
            <img src="/assets/images/Shared/dash-line.svg" alt="" />
            <img
              src="/assets/images/Shared/already-known-icon-black.svg"
              className="w-3.5 h-3.5"
              alt=""
            />
          </div>
          <div className="flex rounded bg-soft-bright justify-evenly w-[55px] h-6 items-center">
            <img
              src="/assets/images/Shared/right-arrow.svg"
              className="w-3.5 h-3.5"
              alt=""
            />
            <img src="/assets/images/Shared/dash-line.svg" alt="" />
            <img
              src="/assets/images/Shared/poker-black-icon.svg"
              className="w-4 h-4"
              alt=""
            />
          </div>
          <div className="bg-pastel-purple p-1 rounded-md flex items-center justify-center w-6 h-6">
            <img
              src="/assets/images/Shared/more-icon.svg"
              alt=""
              className="w-5 h-5"
            />
          </div>
        </div>
      )}

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
