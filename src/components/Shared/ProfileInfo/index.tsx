export const ProfileInfo = ({
  isPerformance = false,
}: {
  isPerformance?: boolean;
}) => {
  return (
    <div className="card">
      <div className="card--header flex justify-between w-full items-center">
        <div className="card--header__left flex gap-4">
          <img
            className="card--header__left__avatar rounded-full border border-[3px] border-pastel-purple h-[51px] w-[51px]"
            src="/assets/images/profile.jpeg"
          />
          <div className="card--header__left__info flex flex-col justify-center">
            <h3 className="text-lg font-medium leading-5">Ali Beigi</h3>
            <div className="leading-5">
              {isPerformance ? (
                <span>Player Tier: </span>
              ) : (
                <span className="font-medium">Bronze </span>
              )}
              {isPerformance ? (
                <span className="font-medium">1</span>
              ) : (
                <span>Subject</span>
              )}
            </div>
          </div>
        </div>
        {isPerformance ? <PerformanceInfo /> : <ConnectionsButton />}
      </div>
      <hr className="my-5 border-dashed" />
      <div className="card--body text-sm">
        <span className="font-normal">Joined at </span>
        <span className="font-medium">29 July, 2020 (323 days ago)</span>
      </div>
    </div>
  );
};

const ConnectionsButton = () => {
  return (
    <div className="card--header__right flex flex-col justify-center bg-pastel-purple rounded h-full py-2 px-3.5">
      <div className="flex w-full justify-between items-center">
        <div className="font-bold text-white leading-5">439</div>
        <img src="/assets/images/Shared/arrow-right-icon-white.svg" alt="" />
      </div>
      <div className="font-bold text-sm text-white leading-5">Connections</div>
    </div>
  );
};

const PerformanceInfo = () => {
  return (
    <div className="card--header__right flex flex-col justify-center bg-pastel-purple rounded h-full py-1.5 px-2 items-center">
      <div className="flex gap-1.5 items-center">
        <img
          className="w-3.5 h-3.5"
          src="/assets/images/Shared/star-icon.svg"
          alt=""
        />
        <div className="font-medium text-white leading-5">439,232</div>
      </div>
      <div className="font-medium text-sm text-white leading-5">
        <span>Rank: </span>
        <span className="font-bold">13</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
