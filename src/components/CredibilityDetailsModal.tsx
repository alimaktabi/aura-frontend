import Modal from 'components/Shared/Modal';
import { EchartsContext } from 'contexts/EchartsContext';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import ReactECharts from 'echarts-for-react';
import { useOutboundConnections } from 'hooks/useSubjectConnections';
import { useSubjectInboundEvaluations } from 'hooks/useSubjectInboundEvaluations';
import { useSubjectName } from 'hooks/useSubjectName';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { selectAuthData } from 'store/profile/selectors';
import { compactFormat } from 'utils/number';

import { HorizontalProgressBar } from './Shared/HorizontalProgressBar';

const CredibilityDetails = ({ subjectId }: { subjectId: string }) => {
  const authData = useSelector(selectAuthData);
  const { auraLevel, auraScore } = useSubjectVerifications(subjectId);
  const { inboundRatings, inboundRatingsStatsString } =
    useSubjectInboundEvaluations(subjectId);
  const {
    loading,
    myRatingToSubject,
    myConnectionToSubject,
    myConfidenceValueInThisSubjectRating,
  } = useMyEvaluationsContext(subjectId);
  const { outboundConnections } = useOutboundConnections(subjectId);
  const { options2 } = useContext(EchartsContext);

  return (
    <div>
      <div>
        <div className="font-bold text-l">As a <span className="text-purple">Player</span>:</div>
        <div>Level: <span className="font-bold">1</span></div>
        <div className="flex w-full gap-2 items-center">
          <div>Score: <span className="font-medium">24.1k</span></div>
          <HorizontalProgressBar percentage={"w-[15%]"} />
        </div>
        <div>Evaluations: <span className="font-bold">5 (4 Pos / 1 Neg)</span></div>
        <div>Your Evaluation: <span className="font-bold text-pl3">Positive - High (3)</span></div>
        <div>Your Evaluation <span className="font-bold text-pl3">Impact: 32%</span></div>
        <ReactECharts
          style={{ height: '110px' }}
          option={options2}
          className="body__chart w-3/4 mb-5 mt-2"
        />
      </div>
      <div>
        <div className="font-bold text-l">As a <span className="text-orange">Subject</span>:</div>
        <div>Level: <span className="font-bold">{auraLevel}</span></div>
        <div>
          Score: <span className="font-medium">{auraScore ? compactFormat(auraScore) : '-'} (28k / 4k)</span>
        </div>
        <div>
          Evaluations: {' '}
          <span className="font-bold">{inboundRatings !== null ? inboundRatings.length : '...'}
            ({inboundRatingsStatsString})</span>
        </div>
        <div>Your Connection: <span className="font-bold">{myConnectionToSubject?.level}</span></div>
        <div>
          Their Connection to you:{' '}
          <span className="font-bold">{outboundConnections !== null
            ? outboundConnections.find((c) => c.id === authData?.brightId)
            ?.level || '-'
            : '...'}</span>
        </div>
        <div>
          Your Evaluation:{' '}
          <span className="font-bold">{loading ? (
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
          )}</span>
        </div>
        <div>Your Evaluation Impact:
          <span className="font-bold text-nl3">32%</span>
        </div>
        <ReactECharts
          style={{ height: '110px' }}
          option={options2}
          className="body__chart w-3/4 mb-5 mt-2"
        />
      </div>
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
  const link = '/subject/' + subjectId;
  const navigate = useNavigate();
  return (
    <Modal isOpen={true} closeModalHandler={onClose} title={name}>
      <div>
        <CredibilityDetails subjectId={subjectId} />
        <div className="mt-4 flex gap-2">
          <Link
            to={link}
            className="btn w-full text-center"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              navigate(link);
            }}
          >
            Player Profile
          </Link>
          <Link
            to={link}
            className="btn btn--bg-orange w-full text-center"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              navigate(link);
            }}
          >
            Subject Profile
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default CredibilityDetailsModal;
