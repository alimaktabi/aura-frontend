import { useEffect, useRef, useState } from 'react';

import {
  EvaluateSubmittedOperation,
  selectEvaluateOperations,
} from '../BrightID/reducer/operationsSlice';
import { operation_states } from '../BrightID/utils/constants';
import { useSelector } from '../store/hooks';

export default function EvaluationOpNotifications() {
  const operations = useSelector(selectEvaluateOperations);
  const prevOperationsRef = useRef<EvaluateSubmittedOperation[] | null>(null);
  const [isDetailed, setIsDetailed] = useState(false);

  useEffect(() => {
    const storedOperations = localStorage.getItem('prevOperations');
    if (storedOperations) {
      prevOperationsRef.current = JSON.parse(
        storedOperations,
      ) as EvaluateSubmittedOperation[];
    }
  }, []);

  const [notificationText, setNotificationText] = useState<string | null>(null);

  useEffect(() => {
    const prevOperations = prevOperationsRef.current;
    if (prevOperations) {
      operations.forEach((operation) => {
        const prevOperation = prevOperations.find(
          (op) => op.hash === operation.hash,
        );
        if (!prevOperation) {
          setNotificationText(
            `Operation Submitted! Waiting for verification...`,
          );
        } else if (
          prevOperation.state !== operation_states.APPLIED &&
          operation.state === operation_states.APPLIED
        ) {
          setNotificationText(`Operation Applied!`);
        } else if (
          prevOperation.state !== operation_states.FAILED &&
          operation.state === operation_states.FAILED
        ) {
          setNotificationText(`Operation Failed!`);
        }
      });
    }

    // Update ref and localStorage with the latest operations
    prevOperationsRef.current = operations;
    localStorage.setItem('prevOperations', JSON.stringify(operations));
  }, [operations]);

  return notificationText === null ? (
    <></>
  ) : (
    <div className="card !bg-neutral-l2 !border-neutral-l3 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-between items-center">
            <img
              src="/assets/images/Shared/close-filled-red.svg"
              className="cursor-pointer"
              onClick={() => setNotificationText(null)}
              alt=""
            />
            <p className="font-bold text-sm text-button-primary">
              {notificationText}
            </p>
          </div>
          <div className="flex w-full justify-between items-center">
            {/*TODO: Handle failed notifications*/}
            {/*<div className="flex gap-0.5">*/}
            {/*  <p className="font-medium text-sm text-nl3">Try Again</p>*/}
            {/*  <img src="/assets/images/Shared/refresh-red.svg" alt="" />*/}
            {/*</div>*/}
            <div
              className="flex gap-0.5 cursor-pointer"
              onClick={() => setIsDetailed(!isDetailed)}
            >
              <p className="font-medium text-sm text-primary-d2">
                View Details
              </p>
              <img
                src={
                  isDetailed
                    ? '/assets/images/Shared/arrow-up-purple.svg'
                    : '/assets/images/Shared/arrow-down-purple.svg'
                }
                alt=""
              />
            </div>
          </div>
        </div>
        {isDetailed && (
          <>
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-1 items-center">
                <img
                  src="/assets/images/profile.jpg"
                  className="border-solid border rounded w-4 h-4 border-orange"
                  alt=""
                />
                <div>Adam Stallard (hardcoded now)</div>
                <img
                  src="/assets/images/Shared/brightid-icon.svg"
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div className="rounded flex px-3 py-1 bg-pl3 gap-1 items-center">
                <img
                  src="/assets/images/Shared/thumbs-up-white.svg"
                  className="w-3.5 h-3.5"
                  alt=""
                />
                <span className="font-medium text-xs text-white">(+4)</span>
              </div>
            </div>

            <div className="flex w-full justify-between items-center">
              <div className="flex gap-1 items-center">
                <img
                  src="/assets/images/profile.jpg"
                  className="border-solid border rounded w-4 h-4 border-orange"
                  alt=""
                />
                <div>Adam Stallard (hardcoded now)</div>
                <img
                  src="/assets/images/Shared/brightid-icon.svg"
                  className="w-3 h-3"
                  alt=""
                />
              </div>
              <div className="rounded flex px-3 py-1 bg-pl3 gap-1 items-center">
                <img
                  src="/assets/images/Shared/thumbs-up-white.svg"
                  className="w-3.5 h-3.5"
                  alt=""
                />
                <span className="font-medium text-xs text-white">(+4)</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
