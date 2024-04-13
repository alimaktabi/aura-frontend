export const Settings = () => {
  return (
    <div className="page page__settings w-full pt-4 flex flex-col gap-4">
      <section className="flex flex-col gap-4 w-full">
        <div className="bg-white-90-card rounded-lg pl-5 py-3.5 pr-2">
          <p className="font-medium text-[20px]">Role Management</p>
        </div>

        <div className="bg-white-90-card rounded-lg pl-5 py-3.5 pr-2">
          <p className="font-medium text-[20px]">Domain Overview</p>
        </div>

        <div className="bg-white-90-card rounded-lg pl-5 py-3.5 pr-2">
          <p className="font-medium text-[20px]">FAQ</p>
        </div>
      </section>
      <section className="mt-auto"></section>
    </div>
  );
};
