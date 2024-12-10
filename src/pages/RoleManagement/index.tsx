import { useMemo } from 'react';
import { FaBook } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSubjectVerifications } from '../../hooks/useSubjectVerifications';
import { selectAuthData } from '../../store/profile/selectors';
import { EvaluationCategory } from '../../types/dashboard';
import { compactFormat } from '../../utils/number';

export const RoleManagement = () => {
  return (
    <div className="page flex flex-col flex-1">
      <section className="flex flex-col gap-3">
        <PlayerCard />
        <TrainerCard />
        <ManagerCard />
      </section>

      <section className="mt-auto flex w-full justify-center">
        <p className="text-white text-sm">Aura version 2.1</p>
      </section>
    </div>
  );
};

const PlayerCard = () => {
  return (
    <div className="bg-white-90-card dark:bg-button-primary flex flex-col gap-3.5 relative cursor-pointer rounded-lg pl-5 py-[18px] pr-6 pb-4 min-h-[150px]">
      <img
        src="/assets/images/RoleManagement/player-shadow-icon.svg"
        alt=""
        className="absolute top-0 left-0"
      />
      <section className="flex justify-between">
        <div className="flex gap-2">
          <img src="/assets/images/Shared/player.svg" alt="" />
          <div>
            <p className="font-medium dark:text-white text-[20px]">Player</p>
            <p className="text-gray00 dark:text-gray-200 text-sm font-medium -mt-1.5">
              <span className="text-gray50 dark:text-gray70">Joined</span> 2y
              ago
            </p>
          </div>
        </div>
        <PlayerLevelAndScore color="text-pastel-purple" />
      </section>

      <section className="flex dark:text-white text-black justify-between mt-auto">
        <div className="flex gap-2 items-end">
          <FaBook size={14} />
          <p className="font-medium underline -mb-1">Guide</p>
        </div>
        <button className="btn btn--outlined btn--small">Hide</button>
      </section>
    </div>
  );
};

const TrainerCard = () => {
  return (
    <div className="bg-white-90-card flex dark:bg-button-primary flex-col gap-3.5 relative cursor-pointer rounded-lg pl-5 py-[18px] pr-6 pb-4 min-h-[150px]">
      <img
        src="/assets/images/RoleManagement/trainer-shadow-icon.svg"
        alt=""
        className="absolute top-0 left-0"
      />
      <section className="flex justify-between">
        <div className="flex gap-2 dark:text-white text-black">
          <img src="/assets/images/Shared/trainer.svg" alt="" />
          <div>
            <p className="font-medium text-[20px] dark:text-white">Trainer</p>
            <p className="text-gray50 text-sm font-medium -mt-1.5">
              Ready to join
            </p>
          </div>
        </div>
        <PlayerLevelAndScore color="text-pastel-green" />
      </section>

      <section className="flex justify-between dark:text-white text-black mt-auto">
        <div className="flex gap-2 items-end">
          <FaBook size={14} />
          <p className="font-medium underline -mb-1">Guide</p>
        </div>
        <button className="btn !bg-pl2 btn--small">Join</button>
      </section>
    </div>
  );
};

const ManagerCard = () => {
  return (
    <div className="bg-white-90-card flex dark:bg-button-primary flex-col gap-3.5 relative cursor-pointer rounded-lg pl-5 py-[18px] pr-6 pb-4 min-h-[150px]">
      <img
        src="/assets/images/RoleManagement/manager-shadow-icon.svg"
        alt=""
        className="absolute top-0 left-0"
      />
      <section className="flex justify-between">
        <div className="flex gap-2">
          <img src="/assets/images/Shared/manager.svg" alt="" />
          <div>
            <p className="font-medium text-[20px] dark:text-white">Manager</p>
            <p className="text-gray50 text-sm font-medium -mt-1.5">-</p>
          </div>
        </div>
        <PlayerLevelAndScore color="text-gray50" />
      </section>

      <section>
        <div className="flex gap-2 items-center mt-2 text-sm font-medium">
          <img src="/assets/images/RoleManagement/item.svg" alt="" />
          <p className="font-medium">
            Reach Trainer Level 2 to unlock
            <span className="text-blue font-bold"> Manager </span>
          </p>
        </div>
      </section>

      <section className="flex justify-between mt-auto dark:text-white text-black">
        <div className="flex gap-2 items-end">
          <FaBook size={14} />
          <p className="font-medium underline -mb-1">Guide</p>
        </div>
      </section>
    </div>
  );
};

const PlayerLevelAndScore = ({ color }: { color: string }) => {
  const { subjectIdProp } = useParams();
  const authData = useSelector(selectAuthData);
  const subjectId = useMemo(
    () => subjectIdProp ?? authData?.brightId,
    [authData?.brightId, subjectIdProp],
  );

  const { auraLevel, auraScore, loading } = useSubjectVerifications(
    subjectId,
    EvaluationCategory.PLAYER,
  );

  return (
    <div
      className={`bg-gray00 rounded min-w-[90px] h-fit pl-2.5 py-1.5 pr-2 flex gap-1.5 justify-between items-center ${color}`}
    >
      <p className={`level text-sm font-bold`}>
        {loading ? '-' : auraLevel ? `lvl ${auraLevel}` : '-'}
      </p>
      <p className={`text-sm font-bold`}>
        {loading ? '-' : auraScore ? compactFormat(auraScore) : '13.3m'}
      </p>
    </div>
  );
};
