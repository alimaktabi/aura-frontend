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
  return (
    <div className="flex flex-col gap-2.5">
      <div className="text-black2 font-medium">{description}</div>
      <div className="flex flex-row justify-between bg-white rounded-[8px] p-3">
        <div className="flex flex-row gap-2.5">
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
          <div className="flex flex-row gap-1">
            <span className="font-black">{count}</span>
            <span className="font-medium">{title}</span>
          </div>
        </div>
        <div className="text-button-primary font-medium">Show All</div>
      </div>
    </div>
  );
};

export default FindTrainersCard;
