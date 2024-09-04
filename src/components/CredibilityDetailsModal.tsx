import Modal from 'components/Shared/Modal';
import { EchartsContext } from 'contexts/EchartsContext';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import ReactECharts from 'echarts-for-react';
import {
  useInboundEvaluations,
  useOutboundEvaluations,
} from 'hooks/useSubjectEvaluations';
import { useSubjectName } from 'hooks/useSubjectName';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { selectAuthData } from 'store/profile/selectors';
import { EvaluationCategory } from 'types/dashboard';
import { compactFormat } from 'utils/number';

import {
  getViewModeSubjectTextColorClass,
  viewAsToViewMode,
} from '../constants';
import { HorizontalProgressBar } from './Shared/HorizontalProgressBar';
import { ToggleInputWithIcon } from './Shared/ToggleInput';

const CredibilityDetailsForRole = ({
  subjectId,
  roleEvaluationCategory,
  onClose,
}: {
  subjectId: string;
  roleEvaluationCategory: EvaluationCategory;
  onClose: () => void;
}) => {
  const authData = useSelector(selectAuthData);
  const { auraLevel, auraScore } = useSubjectVerifications(subjectId);
  const { ratings, inboundRatingsStatsString } = useInboundEvaluations({
    subjectId,
    evaluationCategory: roleEvaluationCategory,
  });
  const {
    loading,
    myRatingToSubject,
    myConnectionToSubject,
    myConfidenceValueInThisSubjectRating,
  } = useMyEvaluationsContext({
    subjectId,
    evaluationCategory: roleEvaluationCategory,
  });
  const { connections } = useOutboundEvaluations({ subjectId });
  const { options2 } = useContext(EchartsContext);
  const link = '/subject/' + subjectId;
  const navigate = useNavigate();

  return (
    <>
      <div className="font-bold text-l">
        As a{' '}
        <span
          className={getViewModeSubjectTextColorClass(
            viewAsToViewMode[roleEvaluationCategory],
          )}
        >
          {roleEvaluationCategory.slice(0, 1).toUpperCase() +
            roleEvaluationCategory.slice(1)}
        </span>
        :
      </div>
      <div>
        Level: <span className="font-bold">{auraLevel}</span>
      </div>
      <div className="flex w-full gap-2 items-center">
        <div>
          Score:{' '}
          <span className="font-medium">
            {auraScore ? compactFormat(auraScore) : '-'}
          </span>
        </div>
        <HorizontalProgressBar percentage={'w-[15%]'} />
      </div>
      <div>
        Evaluations:{' '}
        <span className="font-bold">
          {ratings !== null ? ratings.length : '...'} (
          {inboundRatingsStatsString})
        </span>
      </div>
      <div>
        Your Connection:{' '}
        <span className="font-bold">{myConnectionToSubject?.level}</span>
      </div>
      <div>
        Their Connection to you:{' '}
        <span className="font-bold">
          {connections !== null
            ? connections.find((c) => c.id === authData?.brightId)?.level || '-'
            : '...'}
        </span>
      </div>
      <div>
        Your Evaluation:{' '}
        <span className="font-bold">
          {loading ? (
            <span className="text-gray20">...</span>
          ) : Number(myRatingToSubject?.rating) > 0 ? (
            <span className="text-pl3">
              Positive - {myConfidenceValueInThisSubjectRating} (
              {Number(myRatingToSubject?.rating)})
            </span>
          ) : Number(myRatingToSubject?.rating) < 0 ? (
            <span className="text-nl3">
              Negative - {myConfidenceValueInThisSubjectRating} (
              {Number(myRatingToSubject?.rating)})
            </span>
          ) : (
            '-'
          )}
        </span>
      </div>
      <div>
        Your Evaluation Impact:
        <span className="font-bold text-nl3"> 32%</span>
      </div>
      <ReactECharts
        style={{ height: '110px' }}
        option={options2}
        className="body__chart w-full mb-5 mt-2"
      />
      <Link
        to={link + '?viewas=' + roleEvaluationCategory}
        className="flex btn w-full mt-auto justify-center"
        onClick={(e) => {
          e.preventDefault();
          onClose();
          navigate(link + '?viewas=' + roleEvaluationCategory);
        }}
      >
        View{' '}
        {String(roleEvaluationCategory)[0].toUpperCase() +
          String(roleEvaluationCategory).slice(1)}{' '}
        Profile
      </Link>
    </>
  );
};

const CredibilityDetails = ({
  subjectId,
  onClose,
}: {
  subjectId: string;
  onClose: () => void;
}) => {
  const [isSubject, setIsSubject] = useState(true);
  const evaluationCategory = useMemo(
    () => (isSubject ? EvaluationCategory.SUBJECT : EvaluationCategory.PLAYER),
    [isSubject],
  );

  return (
    <div className="min-h-[450px] flex flex-col">
      <ToggleInputWithIcon
        option1={'Subject'}
        option2={'Player'}
        icon1="/assets/images/Shared/brightid-icon.svg"
        icon1Converted="/assets/images/Shared/brightid-icon-white.svg"
        icon2="/assets/images/player.svg"
        icon2Converted="/assets/images/player.svg"
        isChecked={isSubject}
        setIsChecked={setIsSubject}
      />
      <CredibilityDetailsForRole
        roleEvaluationCategory={evaluationCategory}
        subjectId={subjectId}
        onClose={onClose}
      />
    </div>
  );
};
const CredibilityDetailsModal = ({
  subjectId,
  onClose,
}: {
  subjectId: string;
  onClose: () => void;
}) => {
  const name = useSubjectName(subjectId);
  return (
    <Modal isOpen={true} closeModalHandler={onClose} title={name}>
      <CredibilityDetails subjectId={subjectId} onClose={onClose} />
    </Modal>
  );
};

export default CredibilityDetailsModal;
