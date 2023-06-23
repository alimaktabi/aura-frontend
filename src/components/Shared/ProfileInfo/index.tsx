export const ProfileInfo = () => {
  return (
    <div className="card">
      <div className="card--header flex justify-between w-full items-center">
        <div className="card--header__left flex gap-4">
          <img
            className="card--header__left__avatar rounded-full border border-[3px] border-pastel-purple h-[51px] w-[51px]"
            src="/assets/images/profile.jpg"
          />
          <div className="card--header__left__info flex flex-col justify-center">
            <h3 className="text-lg font-medium leading-5">Ali Beigi</h3>
            <div className="leading-5">
              <span className="font-medium">Bronze </span>
              <span>Subject</span>
            </div>
          </div>
        </div>
        <div className="card--header__right flex flex-col justify-center bg-pastel-purple rounded h-full py-2 px-3.5">
          <div className="flex w-full justify-between">
            <div className="font-bold text-white leading-5">439</div>
            <img
              src="/assets/images/Shared/arrow-right-icon-white.svg"
              alt=""
            />
          </div>
          <div className="font-bold text-sm text-white leading-5">
            Connections
          </div>
        </div>
      </div>
      <hr className="my-5 border-dashed" />
      <div className="card--body text-sm">
        <span className="font-normal">Joined at </span>
        <span className="font-medium">29 July, 2020 (323 days ago)</span>
      </div>
    </div>
  );
};
