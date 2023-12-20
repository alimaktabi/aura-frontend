import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MoveX } from '../../animations';
import FirstStep from './components/firstStep';
import FourthStep from './components/fourthStep';
import SecondStep from './components/secondStep';
import ThirdStep from './components/thirdStep';

const Onboarding = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepNumber = Number(searchParams.get('step'));

  useEffect(() => {
    if (!stepNumber)
      setSearchParams({
        step: '1',
      });
  }, [setSearchParams, stepNumber]);

  const [side, setSide] = useState(300);

  return (
    <div className="page page__splash !pt-[90px] !px-[22px] pb-4 flex flex-col">
      <section className="content">
        <AnimatePresence mode="wait">
          {stepNumber === 1 ? (
            <MoveX x={side} key={1}>
              <FirstStep />
            </MoveX>
          ) : stepNumber === 2 ? (
            <MoveX x={side} key={2}>
              <SecondStep />
            </MoveX>
          ) : stepNumber === 3 ? (
            <MoveX x={side} key={3}>
              <ThirdStep />
            </MoveX>
          ) : (
            <MoveX x={side} key={4}>
              <FourthStep />
            </MoveX>
          )}
        </AnimatePresence>
      </section>

      <section className="actions px-5 flex justify-between items-center w-full mb-24 mt-auto text-center">
        <div className="step-anotators flex gap-2">
          <span
            onClick={() => {
              if (stepNumber > 1) setSide(-300);
              else setSide(300);
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
              if (stepNumber > 2) setSide(-300);
              else setSide(300);
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
              if (stepNumber > 3) setSide(-300);
              else setSide(300);
              setTimeout(() => {
                setSearchParams({ step: '3' });
              }, 100);
            }}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 3 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
          <span
            onClick={() => {
              if (stepNumber > 4) setSide(-300);
              else setSide(300);
              setTimeout(() => {
                setSearchParams({ step: '4' });
              }, 100);
            }}
            className={`transition-all w-2.5 h-2.5 rounded-full cursor-pointer bg-white ${
              stepNumber === 4 && '!w-10 !bg-pastel-purple'
            }`}
          ></span>
        </div>
        <button
          onClick={() => {
            if (stepNumber < 4) {
              setSide(300);
              setTimeout(() => {
                setSearchParams({ step: (stepNumber + 1).toString() });
              }, 100);
            }
          }}
          className={`bg-pastel-purple p-3 rounded-3xl transition-all ${
            stepNumber === 4 && '!rounded-xl'
          }`}
        >
          <img
            src="/assets/images/Shared/next-page.svg"
            className={`translate-x-[1px] w-4 h-4 opacity-1 transition-all ${
              stepNumber === 4 && '!opacity-0'
            }`}
            alt=""
          />
          <p
            className={`opacity-0 w-0 h-0 font-semibold text-xl text-white transition-all ${
              stepNumber === 4 && '!opacity-1 !w-auto !h-auto'
            }`}
          >
            Let&apos;s Start
          </p>
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
