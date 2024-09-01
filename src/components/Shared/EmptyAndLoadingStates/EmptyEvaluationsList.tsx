export const EmptyEvaluationsList = ({
  clearFilter,
  hasFilter,
}: {
  clearFilter: () => void;
  hasFilter: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-2 gap-3">
      <img
        src="/assets/images/Shared/no-evidence-found.svg"
        alt="Empty State"
        className="w-10 h-8"
      />
      <h2 className="text-lg font-medium text-white">No Evaluations found</h2>
      {hasFilter && (
        <p
          className="text-center text-white underline cursor-pointer"
          onClick={clearFilter}
        >
          Reset filters to default
        </p>
      )}
    </div>
  );
};
