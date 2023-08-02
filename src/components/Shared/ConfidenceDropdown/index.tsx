import { useState } from 'react';

const ConfidenceDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [options] = useState([
    {
      id: 1,
      value: (
        <p>
          I have <strong>Low</strong> confidence
        </p>
      ),
    },
    {
      id: 2,
      value: (
        <p>
          I have <strong>Medium</strong> confidence
        </p>
      ),
    },
    {
      id: 3,
      value: (
        <p>
          I have <strong>High</strong> confidence
        </p>
      ),
    },
    {
      id: 4,
      value: (
        <p>
          I have <strong>Very High</strong> confidence
        </p>
      ),
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(options[0]);

  return (
    <div className="dropdown">
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex text-black relative items-center bg-white justify-between rounded-t-lg text-lg pl-5 md:pl-5 pr-3 h-12 md:h-12 cursor-pointer border border-gray10 ${
          !isDropdownOpen && 'rounded-b-lg'
        }`}
      >
        <span className="flex gap-1.5 md:gap-2.5 items-center">
          <p className="font-medium">{selectedItem.value}</p>
        </span>

        <img
          className="w-3 h-3 md:w-[14px] md:h-[14px]"
          src="/assets/images/Shared/dropdown-icon.svg"
          alt=""
        />
        {isDropdownOpen && (
          <div className="dropdown__body absolute w-full top-full bg-white left-0 rounded-b-lg border border-gray10 ">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  setSelectedItem(option);
                  setIsDropdownOpen(false);
                }}
                className="dropdown__item flex items-center justify-between px-5 h-12 cursor-pointer hover:bg-gray10"
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfidenceDropdown;
