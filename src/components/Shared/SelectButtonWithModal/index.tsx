import { ReactNode, useState } from 'react';
import { Modal } from '../../Shared/Modal';

export const SelectButtonWithModal = ({
  title,
  iconLeft,
  selectedItem,
  children,
  modalTitle,
  onClick,
}: {
  title: string;
  iconLeft?: boolean;
  selectedItem: string;
  children?: ReactNode;
  modalTitle?: string;
  onClick?: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="text-xyz-75 text-gray20 text-sm max-md:text-sm max-md:font-semibold">
        {title}:
      </div>
      <div
        onClick={() => setIsModalOpen(true)}
        className="select-button-with-modal__button flex items-center justify-between bg-catskill-white rounded pl-3 md:pl-5 pr-4 h-10 md:h-14 cursor-pointer border border-gray10"
      >
        <span className="flex gap-1.5 md:gap-2.5 items-center">
          {iconLeft && (
            <img
              className="w-3 h-3 md:w-[26px] md:h-[26px]"
              src="/assets/images/Shared/arrow-up-icon-black.svg"
              alt=""
            />
          )}
          <p className="text-gray20 font-medium max-md:text-sm">
            {selectedItem}
          </p>
        </span>

        <img
          className="w-3 h-3 md:w-[14px] md:h-[14px]"
          src="/assets/images/Shared/dropdown-icon.svg"
          alt=""
        />
      </div>
      <Modal
        title={'Filters'}
        isOpen={isModalOpen}
        closeModalHandler={() => setIsModalOpen(false)}
        className="select-button-with-modal__modal"
      >
        {children}
      </Modal>
    </div>
  );
};
