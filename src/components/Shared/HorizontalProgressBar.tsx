export const HorizontalProgressBar = ({
  percentage = 'w-[20%]',
  isWidthFull = false,
}: {
  percentage: string;
  isWidthFull?: boolean;
}) => {
  return (
    <div
      className={`relative bg-gray70 dark:bg-gray20 rounded-sm h-2.5 ${
        isWidthFull ? 'w-full' : 'w-24'
      }`}
    >
      <div
        className={`${percentage} absolute bg-green10 rounded-sm h-full`}
      ></div>
    </div>
  );
};
