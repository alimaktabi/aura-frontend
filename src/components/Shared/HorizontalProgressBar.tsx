export const HorizontalProgressBar = ({
  percentage = 20,
  isWidthFull = false,
}: {
  percentage: number;
  isWidthFull?: boolean;
}) => {
  return (
    <div
      className={`relative bg-gray70 dark:bg-gray20 rounded-sm h-2.5 ${
        isWidthFull ? 'w-full' : 'w-24'
      }`}
    >
      <div
        style={{
          width: `${percentage}%`,
        }}
        className={`absolute bg-green10 rounded-sm h-full`}
      ></div>
    </div>
  );
};
