import {
  getConfidenceValueOfAuraRatingObject,
  viewModeToViewAs,
} from 'constants/index';
import { SubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import { SubjectOutboundEvaluationsContext } from 'contexts/SubjectOutboundEvaluationsContext';
import { useContext, useMemo } from 'react';

import { EvaluationCategory } from '../types/dashboard';
import useViewMode from './useViewMode';

export const useSubjectEvaluationFromContext = ({
  fromSubjectId,
  toSubjectId,
  evaluationCategory,
}: {
  fromSubjectId: string | undefined;
  toSubjectId: string;
  evaluationCategory?: EvaluationCategory;
}) => {
  const inboundEvaluationsContext = useContext(
    SubjectInboundEvaluationsContext,
  );
  const outboundEvaluationsContext = useContext(
    SubjectOutboundEvaluationsContext,
  );

  const { currentViewMode } = useViewMode();
  const rating = useMemo(() => {
    if (inboundEvaluationsContext?.subjectId === toSubjectId) {
      const ratingObject = inboundEvaluationsContext.ratings?.find(
        (r) =>
          r.fromBrightId === fromSubjectId &&
          r.category ===
            (evaluationCategory ?? viewModeToViewAs[currentViewMode]),
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    if (outboundEvaluationsContext?.subjectId === fromSubjectId) {
      const ratingObject = outboundEvaluationsContext?.ratings?.find(
        (r) =>
          r.toBrightId === toSubjectId &&
          r.category ===
            (evaluationCategory ?? viewModeToViewAs[currentViewMode]),
      );
      console.log({ ratingObject });
      if (ratingObject) {
        return ratingObject;
      }
    }
    return null;
  }, [
    currentViewMode,
    evaluationCategory,
    fromSubjectId,
    inboundEvaluationsContext?.ratings,
    inboundEvaluationsContext?.subjectId,
    outboundEvaluationsContext?.ratings,
    outboundEvaluationsContext?.subjectId,
    toSubjectId,
  ]);

  const connectionInfo = useMemo(() => {
    if (inboundEvaluationsContext?.subjectId === toSubjectId) {
      const ratingObject = inboundEvaluationsContext.connections?.find(
        (conn) => conn.id === fromSubjectId,
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    if (outboundEvaluationsContext?.subjectId === fromSubjectId) {
      const ratingObject = outboundEvaluationsContext?.connections?.find(
        (conn) => conn.id === toSubjectId,
      );
      if (ratingObject) {
        return ratingObject;
      }
    }
    return null;
  }, [
    fromSubjectId,
    inboundEvaluationsContext,
    outboundEvaluationsContext,
    toSubjectId,
  ]);

  const confidenceValue = useMemo(
    () => getConfidenceValueOfAuraRatingObject(rating),
    [rating],
  );

  const ratingNumber = useMemo(
    () => rating && Number(rating?.rating),
    [rating],
  );

  if (
    inboundEvaluationsContext?.subjectId !== toSubjectId &&
    outboundEvaluationsContext?.subjectId !== fromSubjectId
  ) {
    throw new Error('proper EvaluationsContext not provided');
  }

  return {
    rating,
    loading:
      (inboundEvaluationsContext?.subjectId === toSubjectId &&
        inboundEvaluationsContext?.loading) ||
      (outboundEvaluationsContext?.subjectId === fromSubjectId &&
        outboundEvaluationsContext?.loading),
    ratingNumber,
    confidenceValue,
    connectionInfo,
  };
};
