import BrightIdProfilePicture from '../../../components/BrightIdProfilePicture';
import { useSubjectInfo } from '../../../hooks/useSubjectInfo';

const ProfileInfoPerformance = ({
  subjectId,
  isPerformance,
  color = 'pastel-green',
}: {
  subjectId: string;
  isPerformance: boolean;
  color: string;
}) => {
  const { name } = useSubjectInfo(subjectId);

  return (
    <div className="card">
      <div className="card--header flex justify-between w-full items-center pb-5 border-b border-dashed border-b-gray90">
        <div className="card--header__left flex gap-4">
          <BrightIdProfilePicture
            className={`card--header__left__avatar rounded-full border-[3px] ${
              isPerformance ? 'border-' + color : 'border-pastel-purple'
            } h-[51px] w-[51px]`}
            subjectId={subjectId}
          />
          <div className="card--header__left__info flex flex-col justify-center">
            <h3 className="text-lg font-medium leading-5">{name}</h3>
            <div className="flex gap-1">
              <strong>Level 1</strong>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-1 rounded-md bg-pastel-purple">
          <div className="flex gap-1 items-center">
            <img src="/assets/images/Shared/star.svg" alt="" />
            <p className="text-sm font-medium">439,232</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-sm font-medium">Rank: </p>
            <p className="text-sm font-bold">13</p>
          </div>
        </div>
      </div>
      <p className="text-sm pt-3">
        Joined at <strong>29 July, 2020 (323 days ago)</strong>
      </p>
    </div>
  );
};

export default ProfileInfoPerformance;
