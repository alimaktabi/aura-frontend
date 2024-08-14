import { useEffect, useRef } from 'react';

import {
  EvaluateSubmittedOperation,
  selectEvaluateOperations,
} from '../BrightID/reducer/operationsSlice';
import { operation_states } from '../BrightID/utils/constants';
import { useSelector } from '../store/hooks';

export default function EvaluationOpNotifications() {
  const operations = useSelector(selectEvaluateOperations);
  const prevOperationsRef = useRef<EvaluateSubmittedOperation[] | null>(null);

  useEffect(() => {
    const storedOperations = localStorage.getItem('prevOperations');
    if (storedOperations) {
      prevOperationsRef.current = JSON.parse(
        storedOperations,
      ) as EvaluateSubmittedOperation[];
    }
  }, []);

  useEffect(() => {
    const prevOperations = prevOperationsRef.current;
    if (prevOperations) {
      operations.forEach((operation) => {
        const prevOperation = prevOperations.find(
          (op) => op.hash === operation.hash,
        );
        if (!prevOperation) {
          alert(`Operation Submitted! Waiting for verification...`);
        } else if (
          prevOperation.state !== operation_states.APPLIED &&
          operation.state === operation_states.APPLIED
        ) {
          alert(`Operation Applied!`);
        } else if (
          prevOperation.state !== operation_states.FAILED &&
          operation.state === operation_states.FAILED
        ) {
          alert(`Operation Failed!`);
        }
      });
    }

    // Update ref and localStorage with the latest operations
    prevOperationsRef.current = operations;
    localStorage.setItem('prevOperations', JSON.stringify(operations));
  }, [operations]);

  return <div></div>;
}
