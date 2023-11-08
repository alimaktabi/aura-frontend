// import { useSubjectEvaluation } from 'hooks/useSubjectEvaluation';
// import { useSubjectInfo } from 'hooks/useSubjectInfo';
// import { useInboundRatings } from 'hooks/useSubjectRatings';

// import { useSelector } from 'react-redux';
// import { selectAuthData } from 'store/profile/selectors';
// import { connectionLevelIconsBlack } from 'utils/connection';
// import { compactFormat } from '../../../utils/number';
import { EvaluatorInfo } from 'components/Shared/EvaluatorInfo';
import { useSubjectBasicInfo } from 'hooks/useSubjectBasicInfo';
import { useSubjectEvaluation } from 'hooks/useSubjectEvaluation';

import { EvaluationInfo } from '../EvaluationInfo';

const ProfileEvaluation = ({
  fromSubjectId,
  toSubjectId,
  className,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  className?: string;
}) => {
  const { loading, ratingNumber } = useSubjectEvaluation({
    fromSubjectId,
    toSubjectId,
  });
  return (
    <div
      className={`profile-evaluation-card card flex flex-col gap-3 ${
        className ? className : ''
      }`}
    >
      {loading ? (
        'Loading...'
      ) : ratingNumber ? (
        <EvaluatedCardBody
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      ) : (
        <ConnectedCardBody
          fromSubjectId={fromSubjectId}
          toSubjectId={toSubjectId}
        />
      )}
    </div>
  );
};

const EvaluatedCardBody = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { name } = useSubjectBasicInfo(toSubjectId);
  return (
    <>
      <div className="card__top-row flex justify-between w-full">
        <EvaluatorInfo evaluatorId={fromSubjectId} />
        <div className="card__top-row__right flex items-start gap-1.5">
          <p className="connected-to text-right text-purple text-sm font-medium">
            evaluated
            <br /> {name}
          </p>
        </div>
      </div>
      <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
    </>
  );
};

const ConnectedCardBody = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string;
  toSubjectId: string;
}) => {
  const { name } = useSubjectBasicInfo(toSubjectId);
  return (
    <>
      <div className="card__top-row flex justify-between items-start w-full">
        <EvaluatorInfo evaluatorId={fromSubjectId} />
        <div className="card__top-row__right flex items-stretch gap-1.5">
          <p className="evaluated text-right text-orange text-sm font-medium">
            connected to <br /> {name}
          </p>
        </div>
      </div>
      <EvaluationInfo fromSubjectId={fromSubjectId} toSubjectId={toSubjectId} />
    </>
  );
};

export default ProfileEvaluation;
