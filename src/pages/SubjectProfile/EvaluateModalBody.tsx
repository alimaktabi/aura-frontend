import { useState } from 'react';
import ConfidenceDropdown from '../../components/Shared/ConfidenceDropdown';

const EvaluateModalBody = () => {
  const [isYes, setIsYes] = useState(true);

  return (
    <div className="">
      <p className="subtitle -mt-6 mb-6">
        as a <span className="font-bold">subject</span> in{' '}
        <span className="font-bold">brightID</span> domain
      </p>

      <p className="font-medium mb-2">
        Is this the account of Beigiz that should be Aura verified?
      </p>

      <div className="p-1.5 rounded-lg bg-white w-full mb-5">
        <div className="w-full h-[38px] relative bg-white flex">
          <span
            className={`background absolute w-1/2 top-0 bottom-0 rounded-md transition-all duration-300 ease-in-out ${
              isYes ? 'left-0 right-1/2 bg-pl2' : 'right-0 left-1/2 bg-error'
            }`}
          ></span>
          <p
            className={`bg-transparent absolute w-1/2 left-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-white' : 'text-black'
            }`}
            onClick={() => setIsYes(true)}
          >
            Yes
          </p>
          <p
            className={`bg-transparent absolute w-1/2 right-0 top-1/2 -translate-y-1/2 text-center font-bold text-lg transition-all duration-300 ease-in-out ${
              isYes ? 'text-black' : 'text-white'
            }`}
            onClick={() => setIsYes(false)}
          >
            No
          </p>
        </div>
      </div>

      <p className="font-medium mb-2">How confident are you?</p>
      <ConfidenceDropdown />
      <button className="btn btn--big w-full mt-36">Submit Evaluation</button>
    </div>
  );
};

export default EvaluateModalBody;
