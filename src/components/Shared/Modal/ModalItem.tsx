import { MouseEventHandler } from 'react';

export const ModalItem = ({
  title,
  icon,
  isSelected,
  className,
  onClick,
}: {
  title: string;
  icon?: string;
  isSelected: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className={`flex justify-center items-center gap-3 rounded px-3 py-2.5 min-w-[30%] ${
        onClick ? 'cursor-pointer' : ''
      } ${isSelected ? 'bg-pastel-purple' : 'bg-gray30'}
      ${className ? className : ''}
      `}
      onClick={onClick}
    >
      {icon && (
        <img
          className="w-3 h-4"
          src={`${icon}${isSelected ? '-white.svg' : '-black.svg'} `}
          alt=""
        />
      )}
      <p
        className={`text-sm ${
          isSelected ? 'font-bold text-white' : 'font-medium text-black2'
        }`}
      >
        {title}
      </p>
    </div>
  );
};
