import { getConfidenceValueOfAuraRatingObject } from 'constants/index';
import { useMyEvaluations } from 'hooks/useMyEvaluations';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';

// Define the context
const MyEvaluationsContext = createContext<ReturnType<
  typeof useMyEvaluations
> | null>(null);

interface ProviderProps {
  children: ReactNode;
}

// Define the Provider component
export const MyEvaluationsContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const useMyEvaluationsHookData = useMyEvaluations();
  return (
    <MyEvaluationsContext.Provider
      value={{
        ...useMyEvaluationsHookData,
      }}
    >
      {children}
    </MyEvaluationsContext.Provider>
  );
};

export const useMyEvaluationsContext = (subjectId?: string) => {
  const context = useContext(MyEvaluationsContext);
  if (context === null) {
    throw new Error(
      'MyEvaluationsContext must be used within a MyEvaluationsContextProvider',
    );
  }
  const myRatingToSubject = useMemo(() => {
    if (!subjectId || !context.myRatings) return undefined;
    return context.myRatings.find((r) => r.toBrightId === subjectId);
  }, [context.myRatings, subjectId]);
  const myConnectionToSubject = useMemo(() => {
    if (!subjectId || !context.myConnections) return undefined;
    return context.myConnections.find((c) => c.id === subjectId);
  }, [context.myConnections, subjectId]);

  const myConfidenceValueInThisSubjectRating = useMemo(
    () => getConfidenceValueOfAuraRatingObject(myRatingToSubject),
    [myRatingToSubject],
  );
  const myRatingNumberToSubject = useMemo(
    () => (myRatingToSubject ? Number(myRatingToSubject?.rating) : null),
    [myRatingToSubject],
  );
  const myLastRating = useMemo(
    () =>
      context.myRatings?.length
        ? context.myRatings[context.myRatings.length - 1]
        : undefined,
    [context.myRatings],
  );
  return {
    ...context,
    myLastRating,
    myRatingToSubject,
    myConnectionToSubject,
    myConfidenceValueInThisSubjectRating,
    myRatingNumberToSubject,
  };
};
