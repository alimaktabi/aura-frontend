import Modal from 'components/Shared/Modal';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useSubjectEvaluation } from 'hooks/useSubjectEvaluation';
import EvaluateModalBody from 'pages/SubjectProfile/EvaluateModalBody';
import { useMemo, useState } from 'react';
import { connectionLevelIconsBlack } from 'utils/connection';

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

  const { rating, loading, confidenceValue, inboundConnectionInfo } =
    useSubjectEvaluation({
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

  if (loading)
    return (
      <div>
        <span className="font-medium">...</span>
      </div>
    );

  return (
    <div>
      {Number(rating?.rating) || isYourEvaluation ? (
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
          <div className="bg-pastel-purple p-2 rounded-md flex items-center justify-center w-[38px] h-[38px]">
            <img
              src="/assets/images/Shared/more-icon.svg"
              alt=""
              className="w-6 h-6"
            />
          </div>
        </div>
      ) : inboundConnectionInfo ? (
        <div className="flex justify-between w-full items-center gap-2.5">
          <img
            src="/assets/images/Shared/brightid-icon.svg"
            alt=""
            className="w-6 h-6"
          />
          <p className="text-black text-[13px] font-medium">
            BrightID
            <br />
            Connection
          </p>
          <div className="flex rounded bg-soft-bright justify-evenly flex-1 items-center h-[38px] ">
            <img
              src={`/assets/images/Shared/${
                connectionLevelIconsBlack[inboundConnectionInfo.level]
              }.svg`}
              className="w-5 h-5"
              alt=""
            />
            <p className="text-sm font-bold">{inboundConnectionInfo.level}</p>
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
        <div>
          <span className="font-medium">...</span>
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
