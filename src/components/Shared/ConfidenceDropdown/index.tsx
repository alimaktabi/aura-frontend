import { useEffect, useMemo, useState } from 'react';

const ConfidenceDropdown = ({
  confidence,
  setConfidence,
}: {
  confidence: number;
  setConfidence: (value: number) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const options = useMemo(
    () => [
      {
        value: 1,
        label: (
          <p>
            I have <strong>Low</strong> confidence
          </p>
        ),
      },
      {
        value: 2,
        label: (
          <p>
            I have <strong>Medium</strong> confidence
          </p>
        ),
      },
      {
        value: 3,
        label: (
          <p>
            I have <strong>High</strong> confidence
          </p>
        ),
      },
      {
        value: 4,
        label: (
          <p>
            I have <strong>Very High</strong> confidence
          </p>
        ),
      },
    ],
    [],
  );

  const [selectedItem, setSelectedItem] = useState(options[0]);
  useEffect(() => {
    const item = options.find((o) => o.value === confidence);
    if (item) {
      setSelectedItem(item);
    }
  }, [confidence, options]);
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
            {options.map((option) => (
              <div
                data-testid={`confidence-dropdown-option-${option.value}`}
                key={option.value}
                onClick={() => {
                  setSelectedItem(option);
                  setConfidence(option.value);
                  setIsDropdownOpen(false);
                }}
                className="dropdown__item flex items-center justify-between px-5 h-12 cursor-pointer hover:bg-gray10"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfidenceDropdown;
