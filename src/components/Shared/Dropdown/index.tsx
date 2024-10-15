import { JSX } from 'react';

interface DropdownItem {
  label: JSX.Element;
  value: string | number;
}

const Dropdown = <T extends DropdownItem>({
  isDropdownOpen,
  setIsDropdownOpen,
  selectedItem,
  items,
  onItemClick,
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  selectedItem: T;
  items: T[];
  onItemClick: (item: T) => void;
}) => {
  return (
    <div className="dropdown cursor-pointer">
      <div
        data-testid="confidence-dropdown-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex text-black relative items-center bg-white justify-between rounded-t-lg text-lg pl-5 md:pl-5 pr-3 h-12 md:h-12 cursor-pointer border border-gray10 ${
          !isDropdownOpen && 'rounded-b-lg'
        }`}
      >
        <span
          className="flex gap-1.5 md:gap-2.5 items-center"
          data-testid="confidence-dropdown-selected-label"
        >
          <p className="font-medium">{selectedItem.label}</p>
        </span>

        <img
          className="w-3 h-3 md:w-[14px] md:h-[14px]"
          src="/assets/images/Shared/dropdown-icon.svg"
          alt=""
        />
        {isDropdownOpen && (
          <div className="dropdown__body absolute w-full top-full bg-white left-0 rounded-b-lg border border-gray10 ">
            {items.map((item) => (
              <div
                data-testid={`confidence-dropdown-option-${item.value}`}
                key={item.value}
                onClick={() => onItemClick(item)}
                className="dropdown__item flex items-center justify-between px-5 h-12 cursor-pointer hover:bg-gray10"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
