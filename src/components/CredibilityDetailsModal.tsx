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

const CredibilityDetails = ({ subjectId }: { subjectId: string }) => {
  const authData = useSelector(selectAuthData);
  const { auraLevel, auraScore } = useSubjectVerifications(subjectId);
  const { inboundRatingsStatsString } = useSubjectInboundEvaluations(subjectId);
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
        <div className="font-bold text-l">As a Player:</div>
        <div>Level: 1</div>
        <div>Score: 24.1k (28k / -3.9k)</div>
        <div>Evaluations: 5 (4 Pos / 1 Neg)</div>
        <div>Your Evaluation: Positive - High (3)</div>
        <div>Your Evaluation Impact: 32%</div>
        <ReactECharts
          style={{ height: '110px' }}
          option={options2}
          className="body__chart w-3/4 mb-5 mt-2"
        />
      </div>
      <hr />
      <div>
        <div className="font-bold text-l">As a Subject:</div>
        <div>Level: {auraLevel}</div>
        <div>
          Score: {auraScore ? compactFormat(auraScore) : '-'} (28k / 4k)
        </div>
        <div>Evaluations: {inboundRatingsStatsString}</div>
        <div>Your Connection: {myConnectionToSubject?.level}</div>
        <div>
          Their Connection to you:{' '}
          {outboundConnections !== null
            ? outboundConnections.find((c) => c.id === authData?.brightId)
                ?.level || '-'
            : '...'}
        </div>
        <div>
          Your Evaluation:{' '}
          {loading ? (
            <span className="text-gray20">...</span>
          ) : Number(myRatingToSubject?.rating) > 0 ? (
            <span className="text-green-800">
              Positive - {myConfidenceValueInThisSubjectRating} (
              {Number(myRatingToSubject?.rating)})
            </span>
          ) : Number(myRatingToSubject?.rating) < 0 ? (
            <span className="text-red-800">
              Negative - {myConfidenceValueInThisSubjectRating} (
              {Number(myRatingToSubject?.rating)})
            </span>
          ) : (
            '-'
          )}
        </div>
        <div>Your Evaluation Impact: 32%</div>
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
        <div className="mt-4 flex gap-2 text-black!">
          <Link
            to={link}
            className="btn btn--text-black w-full text-center text-black"
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
            className="btn btn--text-black w-full text-center text-black"
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
