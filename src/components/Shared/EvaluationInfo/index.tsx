import { useSubjectRating } from '../../../hooks/useSubjectRating.ts';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../../store/profile/selectors.ts';
import Modal from 'components/Shared/Modal';
import EvaluateModalBody from 'pages/SubjectProfile/EvaluateModalBody.tsx';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo.ts';

export const EvaluationInfo = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const [isEvaluateNowModalOpen, setIsEvaluateNowModalOpen] = useState(false);
  const authData = useSelector(selectAuthData);
  const { name } = useSubjectBasicInfo(toSubjectId);

  const { rating, loading, confidenceValue } = useSubjectRating({
    fromSubjectId,
    toSubjectId,
  });

  const isYourEvaluation = useMemo(
    () => fromSubjectId === authData?.brightId,
    [authData?.brightId, fromSubjectId],
  );

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
    <div className="flex gap-2.5 items-center text-sm">
      <div
        className={`p-2.5 rounded ${
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
        className={`flex w-full justify-between rounded items-center p-1.5 ${
          styleValues.bgAndTextColor
        } ${isYourEvaluation ? 'p-1.5' : 'p-2.5'}`}
      >
        {loading ? (
          <div>
            <span className="font-medium">...</span>
          </div>
        ) : (
          <div>
            <span className="font-medium">{styleValues.text}</span>
            <span className="font-bold">
              {confidenceValue ? ` - ${confidenceValue}` : ''}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="font-medium">{rating?.rating ?? ''}</span>
          {isYourEvaluation && (
            <div
              className={`p-1.5 rounded cursor-pointer ${styleValues.iconBgColor}`}
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
          subjectId={toSubjectId}
          onSubmitted={() => setIsEvaluateNowModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
