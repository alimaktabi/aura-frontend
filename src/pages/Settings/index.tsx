export const Settings = () => {
  return (
    <div className="page page__settings w-full pt-4 flex flex-col gap-4">
      <section className="flex flex-col gap-4 w-full">
        <div className="bg-white-90-card cursor-pointer rounded-lg pl-5 py-3.5 pr-2">
          <p className="font-medium text-[20px]">Role Management</p>
        </div>

        <div className="bg-white-90-card cursor-pointer rounded-lg pl-5 py-3.5 pr-2">
          <p className="font-medium text-[20px]">Domain Overview</p>
        </div>

        <div className="bg-white-90-card cursor-pointer rounded-lg pl-5 py-3.5 pr-2">
          <p className="font-medium text-[20px]">FAQ</p>
        </div>
      </section>
      <section className="mt-auto flex justify-center items-center gap-11 mb-2">
        <img
          src="/assets/images/Shared/guide.svg"
          alt=""
          className="w-auto h-9 cursor-pointer"
        />
        <img
          src="/assets/images/Shared/discord.svg"
          alt=""
          className="w-auto h-9 cursor-pointer"
        />
        <img
          src="/assets/images/Shared/brightid-icon-white.svg"
          alt=""
          className="w-auto h-9 cursor-pointer"
        />
      </section>
      <section className="flex w-full justify-center">
        <p className="text-white text-sm">Aura version 2.1</p>
      </section>
    </div>
  );
};
