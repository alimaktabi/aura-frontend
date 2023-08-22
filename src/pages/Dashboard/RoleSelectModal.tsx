const RoleSelectModal = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="card flex !flex-row gap-4 !bg-opacity-100 items-center justify-between">
        <img
          className=""
          src="/assets/images/DomainOverview/players-icon.svg"
          alt=""
        />
        <div>Player</div>
      </div>
      <div className="card flex !flex-row gap-4 !bg-opacity-100 items-center justify-between">
        <img
          className="icon"
          src="/assets/images/DomainOverview/trainers-icon.svg"
          alt=""
        />
        <div>Trainer</div>
      </div>
      <div className="card flex !flex-row gap-4 !bg-opacity-100 items-center justify-between">
        <img
          className="icon"
          src="/assets/images/DomainOverview/managers-icon.svg"
          alt=""
        />
        <div>Manager</div>
      </div>
    </div>
  );
};

export default RoleSelectModal;
