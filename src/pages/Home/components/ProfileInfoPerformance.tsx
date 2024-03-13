const ProfileInfoPerformance = ({
  subjectId,
  isPerformance,
  color = 'pastel-green',
  isLocked,
  percentage,
}: {
  subjectId: string;
  isPerformance: boolean;
  color: string;
  isLocked: boolean;
  percentage: string;
}) => {
  return (
    <div className="card relative">
      <div className="absolute top-0 right-0">
        <img src="/assets/images/Home/level-up-icon.svg" alt="" />
      </div>
      <div className="flex flex-row gap-4 w-full items-end">
        {!isLocked && (
          <div className="flex flex-col items-center justify-between gap-1.5 rounded-[6px] bg-primary-l1 px-2 py-1.5">
            <div className="font-bold leading-4">Level</div>
            <div className="font-black leading-6 text-2xl">2</div>
          </div>
        )}
        <div className="flex flex-col w-full gap-3.5">
          {isLocked ? (
            <div className="flex flex-row items-end gap-1">
              <span className="text-2xl font-black">2</span>
              <span className="text-lg font-medium">
                more evaluations to unlock Level-up
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-end gap-1">
              <span className="text-2xl font-black">25,234</span>
              <span className="text-lg font-medium">to</span>
              <span className="text-lg font-medium text-button-primary">
                Level 3
              </span>
            </div>
          )}
          <div className="w-full relative bg-gray30 rounded-full h-4">
            <div
              className={`${percentage} absolute bg-primary-d1 rounded-full h-full`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoPerformance;
