import * as React from 'react';

export interface ModalItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
      } ${
        isSelected
          ? 'bg-pastel-purple dark:bg-primary-d1'
          : 'bg-gray30 dark:bg-button-primary'
      }
      ${className ? className : ''}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && <img className="w-3 h-4" src={`${icon}-black.svg`} alt="" />}
      <p
        className={`text-sm ${
          isSelected
            ? 'font-bold text-black'
            : 'font-medium dark:text-gray-100 text-black2'
        }`}
      >
        {title}
      </p>
    </div>
  );
};
