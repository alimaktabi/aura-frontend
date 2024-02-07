export const HorizontalProgressBar = ({percentage = "w-[20%]"}:{percentage: string}) => {
  return (
    <div className="relative bg-gray70 rounded-sm h-2.5 w-24">
      <div
        className={`${percentage} absolute bg-green10 rounded-sm h-full`}
      ></div>
    </div>
  )
}

