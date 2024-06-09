export const LoadingList = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-2 gap-2">
      <div className="flex gap-1 items-center">
        <h2 className="text-xl font-medium text-white">Loading</h2>
        <span className="mt-2 w-1 h-1 bg-white rounded-full animate-bounce"></span>
        <span className="mt-2 w-1 h-1 bg-white rounded-full animate-bounce animation-delay-200"></span>
        <span className="mt-2 w-1 h-1 bg-white rounded-full animate-bounce animation-delay-400"></span>
      </div>
    </div>
  );
};
