export const MeetAndEvaluationStatus = ({
  evaluationValue = 4,
  hasEvaluation = true,
}: {
  evaluationValue: number;
  hasEvaluation?: boolean;
}) => {
  const calculateStyles = (status: number) => {
    const style = {
      bg: 'bg-green10',
      text: 'text-white',
      icon: '/assets/images/Shared/thumbs-up-white.svg',
    };
    if (status < 4 && status >= 3) {
      style.bg = 'bg-pl2';
    }
    if (status < 3 && status >= 2) {
      style.bg = 'bg-green20';
      style.text = 'text-black';
      style.icon = '/assets/images/Shared/thumbs-up-black.svg';
    }
    if (status < 2 && status >= 0) {
      style.bg = 'bg-green30';
      style.text = 'text-black';
      style.icon = '/assets/images/Shared/thumbs-up-black.svg';
    }
    if (status < 0 && status >= -2) {
      style.bg = 'bg-nl1';
      style.text = 'text-black';
      style.icon = '/assets/images/Shared/thumbs-down-black.svg';
    }
    if (status < -2 && status >= -3) {
      style.bg = 'bg-nl2';
      style.text = 'text-black';
      style.icon = '/assets/images/Shared/thumbs-down-black.svg';
    }
    if (status < -3 && status >= -4) {
      style.bg = 'bg-nl3';
      style.text = 'text-white';
      style.icon = '/assets/images/Shared/thumbs-down-white.svg';
    }
    if (status < -4) {
      style.bg = 'bg-nl4';
      style.text = 'text-white';
      style.icon = '/assets/images/Shared/thumbs-down-white.svg';
    }
    return style;
  };
  const style = calculateStyles(evaluationValue);
  return (
    <div className="w-full flex gap-1">
      <div className="flex gap-1 p-2 rounded-md bg-soft-bright">
        <img
          src="/assets/images/Shared/already-known-icon.svg"
          alt=""
          width="20px"
          height="20px"
        />
        {!hasEvaluation && (
          <p className="font-medium text-black text-sm">Already Known</p>
        )}
      </div>
      {hasEvaluation && (
        <div
          className={`flex gap-1 items-center rounded-md ${style.bg} ${style.text} py-2.5 px-3`}
        >
          <img src={`${style.icon}`} alt="" width="18px" height="18px" />
          <p className="font-bold text-sm leading-4">Very High (+4)</p>
        </div>
      )}
    </div>
  );
};
