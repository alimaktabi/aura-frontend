import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MoveX } from '../../animations';
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

  const [side, setSide] = useState(50);

  return (
    <div className="page page__splash !pt-[90px] !px-[22px] pb-4 flex flex-col">
      <section className="content">
        <AnimatePresence>
          {stepNumber === 1 ? (
            <MoveX x={side} key={1}>
              <FirstStep />
            </MoveX>
          ) : stepNumber === 2 ? (
            <MoveX x={side} key={2}>
              <SecondStep />
            </MoveX>
          ) : (
            <MoveX x={side} key={3}>
              <SecondStep />
            </MoveX>
          )}
        </AnimatePresence>
      </section>

      <section className="actions px-5 flex justify-between items-center w-full mb-24 mt-auto text-center">
        <div className="step-anotators flex gap-2">
          <span
            onClick={() => {
              if (stepNumber > 1) setSide(-50);
              else setSide(50);
              setTimeout(() => {
                setSearchParams({ step: '1' });
              }, 100);
            }}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 1 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
          <span
            onClick={() => {
              if (stepNumber > 2) setSide(-50);
              else setSide(50);
              setTimeout(() => {
                setSearchParams({ step: '2' });
              }, 100);
            }}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 2 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
          <span
            onClick={() => {
              if (stepNumber > 3) setSide(-50);
              else setSide(50);
              setTimeout(() => {
                setSearchParams({ step: '3' });
              }, 100);
            }}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 3 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
        </div>
        <button
          onClick={() => {
            if (stepNumber < 3) {
              setSide(50);
              setTimeout(() => {
                setSearchParams({ step: (stepNumber + 1).toString() });
              }, 100);
            }
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
