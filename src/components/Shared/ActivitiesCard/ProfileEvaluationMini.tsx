import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';

import { EvaluationInfo } from '../EvaluationInfo';

const ProfileEvaluationMini = () => {
  const { myLastRating } = useMyEvaluationsContext();
  return (
    <div className="card !bg-opacity-100">
      <div className="flex justify-between items-center mb-4 leading-3">
        <div className="font-bold text-lg text-black">Proposal no.13</div>
        <div className="flex items-center gap-1.5 rounded bg-gray00 py-1.5 px-2">
          <img src="/assets/images/Shared/star-icon.svg" alt="" />
          <div className="text-white text-xs">233k (323)</div>
        </div>
      </div>
      <div>
        <EvaluationInfo toSubjectId={myLastRating?.toBrightId} />
      </div>
    </div>
  );
};

export default ProfileEvaluationMini;
