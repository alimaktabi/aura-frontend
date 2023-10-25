import BrightIdProfilePicture from '../../components/BrightIdProfilePicture';
import { useSubjectInfo } from '../../hooks/useSubjectInfo';

const EvaluateOverlayCard = ({
  className,
  isPerformance = false,
  subjectId,
  color = 'pastel-green',
}: {
  className?: string;
  isPerformance?: boolean;
  subjectId: string | undefined;
  color?: string;
}) => {
  const { level, name } = useSubjectInfo(subjectId);

  return (
    <div className={`card !bg-white ${className}`}>
      <div className="card--header flex justify-between w-full items-center">
        <div className="card--header__left flex gap-4">
          <BrightIdProfilePicture
            className={`card--header__left__avatar rounded-full border-[3px] ${
              isPerformance ? 'border-' + color : 'border-pastel-purple'
            } h-[51px] w-[51px]`}
            subjectId={subjectId}
          />
          <div className="card--header__left__info flex flex-col justify-center">
            <h3 className="text-lg font-medium leading-5">{name}</h3>
            <div className="leading-5">
              {isPerformance ? (
                <>
                  <span>Player Level: </span>
                  <span className="font-medium">1</span>
                </>
              ) : level ? (
                <>
                  <span className="font-medium">{level} </span>
                  <span>Subject</span>
                </>
              ) : (
                <span className="font-medium">Loading...</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center cursor-pointer items-center bg-pastel-purple text-black min-w-[90px] py-2 rounded-md">
          <img
            src="/assets/images/SubjectProfile/subject-evaluation.svg"
            alt=""
          />
          <p className="font-medium">Evaluate</p>
        </div>
      </div>
    </div>
  );
};

export default EvaluateOverlayCard;
