import { useSubjectInboundEvaluations } from 'hooks/useSubjectInboundEvaluations';
import React, { createContext, ReactNode, useContext } from 'react';

// Define the context
const SubjectInboundEvaluationsContext = createContext<
  | (ReturnType<typeof useSubjectInboundEvaluations> & {
      subjectId: string;
    })
  | null
>(null);

interface ProviderProps {
  subjectId: string;
  children: ReactNode;
}

// Define the Provider component
export const SubjectInboundEvaluationsContextProvider: React.FC<
  ProviderProps
> = ({ subjectId, children }) => {
  const hookData = useSubjectInboundEvaluations(subjectId);
  return (
    <SubjectInboundEvaluationsContext.Provider
      value={{ ...hookData, subjectId }}
    >
      {children}
    </SubjectInboundEvaluationsContext.Provider>
  );
};

export const useSubjectInboundEvaluationsContext = (subjectId: string) => {
  const context = useContext(SubjectInboundEvaluationsContext);
  if (context === null || context.subjectId !== subjectId) {
    throw new Error(
      'SubjectInboundEvaluationsContext must be used within a SubjectInboundEvaluationsContextProvider',
    );
  }
  return context;
};
