import * as React from 'react';

interface ModalItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: string | null;
  isSelected: boolean;
}

export const ModalItem = ({
  title,
  icon,
  isSelected,
  className,
  onClick,
  ...props
}: ModalItemProps) => {
  return (
    <div
      className={`flex justify-center items-center gap-3 rounded px-3 py-2.5 min-w-[30%] ${
        onClick ? 'cursor-pointer' : ''
      } ${isSelected ? 'bg-pastel-purple' : 'bg-gray30'}
      ${className ? className : ''}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && <img className="w-3 h-4" src={`${icon}-black.svg`} alt="" />}
      <p
        className={`text-sm ${
          isSelected ? 'font-bold text-black' : 'font-medium text-black2'
        }`}
      >
        {title}
      </p>
    </div>
  );
};
