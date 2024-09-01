export const EmptySubjectList = ({
  clearFilter,
  hasFilter,
}: {
  clearFilter: () => void;
  hasFilter: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-2 gap-2">
      <img
        src="/assets/images/Shared/no-subjects-found.svg"
        alt="Empty State"
        className="w-10 h-8 mb-1"
      />
      <h2 className="text-lg font-medium text-white">No subjects found</h2>
      <p className="text-center text-white">
        {hasFilter ? (
          <span className="underline cursor-pointer" onClick={clearFilter}>
            Reset filters to default
          </span>
        ) : (
          <>
            Open the{' '}
            <span className="text-bright-l1 hover:underline cursor-pointer">
              BrightID
            </span>{' '}
            app to connect with someone. After connecting, you&apos;ll be able
            to evaluate them here
          </>
        )}
      </p>
    </div>
  );
};
