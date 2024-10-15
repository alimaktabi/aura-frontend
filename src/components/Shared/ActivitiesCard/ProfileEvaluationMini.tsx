import EvaluationInfo from 'components/Shared/EvaluationInfo/EvaluationInfo';
import { useSubjectName } from 'hooks/useSubjectName';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import { compactFormat } from 'utils/number';

import {
  viewModeToSubjectViewMode,
  viewModeToViewAs,
} from '../../../constants';
import useViewMode from '../../../hooks/useViewMode';
import { EvaluationCategory } from '../../../types/dashboard';
import BrightIdProfilePicture from '../../BrightIdProfilePicture';

const ProfileEvaluationMini = ({
  fromSubjectId,
  toSubjectId,
  onClick,
  evaluationCategory,
}: {
  fromSubjectId: string;
  toSubjectId: string;
  onClick?: () => void;
  evaluationCategory: EvaluationCategory;
}) => {
  const name = useSubjectName(toSubjectId);
  const { currentViewMode } = useViewMode();
  const { auraLevel, auraScore } = useSubjectVerifications(
    toSubjectId,
    viewModeToViewAs[viewModeToSubjectViewMode[currentViewMode]],
  );
  return (
    <div
      className={`card !bg-opacity-100 gap-2 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex w-full items-center">
        <BrightIdProfilePicture
          className={`card--header__left__avatar rounded border border-pastel-purple h-10 w-10`}
          subjectId={toSubjectId}
        />
        <p className="font-bold ml-1.5">{name}</p>
        <div className="ml-auto px-2 py-1.5 rounded bg-gray00">
          <p className="font-bold text-sm text-light-orange">
            {auraLevel} {auraScore ? compactFormat(auraScore) : '-'}
          </p>
        </div>
      </div>
      <EvaluationInfo
        fromSubjectId={fromSubjectId}
        toSubjectId={toSubjectId}
        evaluationCategory={evaluationCategory}
      />
    </div>
  );
};

export default ProfileEvaluationMini;
