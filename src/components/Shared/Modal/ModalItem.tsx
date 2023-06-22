export const ModalItem = ({
  title,
  icon,
  isSelected,
}: {
  title: string;
  icon: string;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`flex justify-center w-full gap-3 py-1.5 py-2.5 min-w-[33%] ${
        isSelected ? 'bg-pastel-purple' : 'bg-gray30'
      }`}
    >
      {icon && <img className="w-3 h-4" src={icon} alt="" />}
      <p
        className={`text-sm ${
          isSelected
            ? 'font-bold text-pastel-purple'
            : 'font-medium text-black2'
        }`}
      >
        {title}
      </p>
    </div>
  );
};
