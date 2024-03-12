import { useState } from 'react';

import LinkCard from '../../../pages/Home/LinkCard';

const FindTrainersCard = () => {
  return (
    <div className="card">
      <div className="mb-4.5 font-bold text-lg text-black">Find Trainers</div>
      <div className="flex flex-col gap-2.5">
        <TrainersListBrief
          description={
            'Here is a list of trainers from you brightID connection list. Ask them to check your work and help you improve.'
          }
          count={3}
          title={'Trainers'}
        />
        <TrainersListBrief
          description={
            'Or you can ask other players you know to introduce you to their trainers.'
          }
          count={12}
          title={'Players'}
        />
        <div className="mb-[22px]">
          <LinkCard />
        </div>
      </div>
    </div>
  );
};

const TrainersListBrief = ({
  description,
  count,
  title,
}: {
  description: string;
  count: number;
  title: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  //TODO: Animation must be implemented
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-black2 font-medium">{description}</div>
      <div className="flex flex-col gap-2 bg-white rounded-[8px] p-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2.5">
            {!isExpanded && (
              <div className="flex flex-row gap-0.5">
                <img
                  className="w-6 h-6 rounded border-pastel-green border-[1px]"
                  src="/assets/images/profile.jpg"
                  alt=""
                />
                <img
                  className="w-6 h-6 rounded border-pastel-green border-[1px]"
                  src="/assets/images/profile.jpg"
                  alt=""
                />
                <img
                  className="w-6 h-6 rounded border-pastel-green border-[1px]"
                  src="/assets/images/profile.jpg"
                  alt=""
                />
              </div>
            )}
            <div className="flex flex-row gap-1">
              <span className="font-black">{count}</span>
              <span className="font-medium">{title}</span>
            </div>
          </div>
          {isExpanded ? (
            <img
              src="/assets/images/Shared/minus-purple-icon.svg"
              alt=""
              className="cursor-pointer -mt-2"
              onClick={() => setIsExpanded(false)}
            />
          ) : (
            <div
              className="text-button-primary font-medium cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              Show All
            </div>
          )}
        </div>
        {isExpanded && (
          <div className="flex flex-col gap-2">
            <TrainerItemBiref />
            <TrainerItemBiref />
            <TrainerItemBiref />
          </div>
        )}
      </div>
    </div>
  );
};

const TrainerItemBiref = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-1.5 items-center">
        <img
          className="w-[26px] h-[26px] rounded border-pastel-green border-[1px]"
          src="/assets/images/profile.jpg"
          alt=""
        />
        <div className="flex flex-col leading-3">
          <div className="font-bold text-sm leading-4">Adam Stallard</div>
          <div className="leading-3">
            <span className="font-bold text-xs">Level 2 </span>
            <span className="font-medium text-xs">(7 Trainees)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col leading-3">
        <div className="text-gray20 text-[10px] font-normal">
          Your connection
        </div>
        <div>
          <img
            src="/assets/images/Shared/smiling-face-with-sunglasses-emoji.svg"
            alt=""
            className="inline mr-0.5"
          />
          <span className="font-medium text-sm leading-3">Just Met</span>
        </div>
      </div>
    </div>
  );
};

export default FindTrainersCard;
