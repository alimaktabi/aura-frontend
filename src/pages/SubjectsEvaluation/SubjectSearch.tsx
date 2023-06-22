import { SelectButtonWithModal } from '../../components/Shared/SelectButtonWithModal';

export const SubjectSearch = () => {
  return (
    <div className="card flex flex-col gap-4">
      <div className="card__input flex gap-2 items-center rounded bg-gray30 px-3.5">
        <img
          className="w-4 h-4"
          src="/assets/images/Shared/search-icon.svg"
          alt=""
        />
        <input
          className="w-full bg-gray30 text-black2 font-medium placeholder-black2 text-sm h-11 focus:outline-none"
          type="text"
          placeholder="Subject name or ID ..."
        />
      </div>
      <div className="card__filters flex gap-3">
        <SelectButtonWithModal
          title="Filters"
          iconLeft={false}
          selectedItem="No filter"
        />
        <SelectButtonWithModal
          title="Sort By"
          iconLeft={true}
          selectedItem="Last created"
        />
      </div>
    </div>
  );
};
