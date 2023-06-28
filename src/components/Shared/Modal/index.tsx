import * as React from 'react';
import { FC } from 'react';
import { FiltersModal } from '../../../pages/SubjectsEvaluation/FiltersModal';
import { SortModal } from '../../../pages/SubjectsEvaluation/SortModal';
import { EvaluationListModal } from '../../../pages/SubjectProfile/EvaluationListModal';

export const Modal: FC<{
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isOpen: boolean;
  noButtonPadding?: boolean;
  children: React.ReactNode;
  closeModalHandler: () => void;
}> = ({
  title,
  children,
  size,
  isOpen,
  closeModalHandler,
  className,
  noButtonPadding,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-[100] left-0 top-0 w-full h-full overflow-hidden backdrop-blur-sm flex items-center justify-center bg-modal-backdrop ${className}`}
          onClick={(_e) => closeModalHandler()}
          data-testid="modal-wrapper"
        >
          <div
            className={`modal-content bg-gray40 max-w-[400px] w-[90%] px-5 pt-5 pb-5 relative overflow-hidden -z-10 ${
              size === 'sm' ? '' : ''
            } ${noButtonPadding ? 'pb-0' : ''} rounded-3xl`}
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-content"
          >
            <div className="modal-header flex justify-between items-center mb-6">
              <p className="text-black2 text-sm font-bold">{title}</p>

              <img
                className="cursor-pointer"
                onClick={closeModalHandler}
                src="/assets/images/Shared/close-icon.svg"
                width="15px"
                height="15px"
                alt={'X'}
              />
            </div>
            <div className=" mt-4.5 w-full flex gap-2"></div>
            <div className="z-10 styled-scroll">
              <EvaluationListModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
