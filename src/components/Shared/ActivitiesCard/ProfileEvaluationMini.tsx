import { useSelector } from 'react-redux';

import { selectAuthData } from '../../../store/profile/selectors';
import BrightIdProfilePicture from '../../BrightIdProfilePicture';

const ProfileEvaluationMini = () => {
  const authData = useSelector(selectAuthData);

  return (
    <div className="card !bg-opacity-100 gap-2">
      <div className="flex w-full items-center">
        <BrightIdProfilePicture
          className={`card--header__left__avatar rounded border border-pastel-purple h-10 w-10`}
          subjectId={authData?.brightId}
        />
        <p className="font-bold ml-1.5">Adam Stallard</p>
        <div className="ml-auto px-2 py-1.5 rounded bg-gray00">
          <p className="font-bold text-sm text-light-orange">
            Lvl 1 13.4<span className="font-medium">m</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-pl1 rounded-md px-1.5 py-2">
        <p className="text-sm font-bold">Positive - Very High</p>
        <div className="flex gap-1.5 items-center">
          <p className="text-sm font-medium">2.32K (11%)</p>
          <img src="/assets/images/Shared/green-pen-icon.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProfileEvaluationMini;
