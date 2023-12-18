import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import FirstStep from './components/firstStep';
import SecondStep from './components/secondStep';

const Onboarding = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepNumber = Number(searchParams.get('step'));

  useEffect(() => {
    if (!stepNumber)
      setSearchParams({
        step: '1',
      });
  }, [setSearchParams, stepNumber]);

  return (
    <div className="page page__splash !pt-[90px] !px-[22px] pb-4 flex flex-col">
      <section className="content pl-5 pr-12">
        {stepNumber === 1 && <FirstStep />}
        {stepNumber === 2 && <SecondStep />}
      </section>

      <section className="actions px-5 flex justify-between items-center w-full mb-24 mt-auto text-center">
        <div className="step-anotators flex gap-2">
          <span
            onClick={() => setSearchParams({ step: '1' })}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 1 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
          <span
            onClick={() => setSearchParams({ step: '2' })}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 2 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
          <span
            onClick={() => setSearchParams({ step: '3' })}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 3 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
        </div>
        <button
          onClick={() => {
            if (stepNumber < 3)
              setSearchParams({ step: (stepNumber + 1).toString() });
          }}
          className="btn btn--icon btn--big !rounded-full"
        >
          <img
            src="/assets/images/Shared/next-page.svg"
            className="translate-x-[1px]"
            alt=""
          />
        </button>
      </section>
      <footer className="flex justify-between text-gray90 text-sm">
        <span className="flex gap-1">
          <p className="font-light">Version</p>
          <p className="">2.1</p>
        </span>
        <span className="flex gap-1">
          <p className="text-gray50">Powered by:</p>
          <p className="font-light">BrightID</p>
        </span>
      </footer>
    </div>
  );
};

export default Onboarding;
