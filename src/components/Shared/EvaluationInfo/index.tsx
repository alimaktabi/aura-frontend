import { useSubjectRating } from '../../../hooks/useSubjectRating.ts';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../../store/profile/selectors.ts';
import { useMemo } from 'react';
import { getConfidenceValue } from '../../../utils/constants.ts';

export const EvaluationInfo = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { rating, loading } = useSubjectRating({ fromSubjectId, toSubjectId });
  const authData = useSelector(selectAuthData);
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
  const confidenceValue = useMemo(() => getConfidenceValue(rating), [rating]);
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
            <div className={`p-1.5 rounded ${styleValues.iconBgColor}`}>
              <img
                src="/assets/images/Shared/edit-icon.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
