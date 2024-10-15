import BrightIdProfilePicture from 'components/BrightIdProfilePicture';
import { ConnectionAndEvaluationStatus } from 'components/ConnectionAndEvaluationStatus';
import { getViewModeSubjectBorderColorClass } from 'constants/index';
import { EchartsContext } from 'contexts/EchartsContext';
import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import ReactECharts from 'echarts-for-react';
import useParseBrightIdVerificationData from 'hooks/useParseBrightIdVerificationData';
import { useSubjectName } from 'hooks/useSubjectName';
import useViewMode from 'hooks/useViewMode';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { compactFormat } from 'utils/number';

import { HorizontalProgressBar } from '../Shared/HorizontalProgressBar';

export const SubjectCard = ({
  subjectId,
  index,
}: {
  subjectId: string;
  index?: string | number;
}) => {
  const name = useSubjectName(subjectId);

  const { options3 } = useContext(EchartsContext);

  const { myConnectionToSubject: inboundConnectionInfo } =
    useMyEvaluationsContext({ subjectId });
  const { currentViewMode, currentEvaluationCategory } = useViewMode();

  const { auraLevel, auraScore } = useParseBrightIdVerificationData(
    inboundConnectionInfo?.verifications,
    currentEvaluationCategory,
  );

  return (
    <Link
      to={'/subject/' + subjectId}
      className={`card card--evaluation b-4 flex !flex-row gap-1 !justify-between w-full`}
      data-testid={`subject-card-${subjectId}`}
    >
      <div
        className="evaluation-left flex flex-col gap-2"
        data-testid={`user-item-${index}`}
      >
        <div className="evaluation-left__top flex gap-3">
          <div className="evaluation__profile">
            <BrightIdProfilePicture
              className={`rounded-full w-12 h-12 border-2 ${getViewModeSubjectBorderColorClass(
                currentViewMode,
              )} bg-center bg-cover`}
              subjectId={subjectId}
            />
          </div>
          <div className="evaluation__info flex flex-col">
            <p
              className="text-black font-medium"
              data-testid={`user-item-${index}-name`}
            >
              {name}
            </p>
            <p className="text-gray10">
              Level: <span className="font-medium text-black">{auraLevel}</span>
            </p>
          </div>
        </div>
        <div className="evaluation-left__bottom">
          <ConnectionAndEvaluationStatus subjectId={subjectId} />
        </div>
      </div>
      <div className="evaluation-right flex flex-col gap-2 items-end">
        <div className="evaluation-right__top">
          <p className="text-gray10">
            Score:{' '}
            <span className="font-medium text-black">
              {auraScore ? compactFormat(auraScore) : '-'}
            </span>
          </p>
        </div>
        <HorizontalProgressBar isWidthFull={true} percentage={'w-[20%]'} />
        <div className="evaluation-right__bottom">
          <ReactECharts
            style={{ height: '48px', width: '100%' }}
            option={options3}
          />
        </div>
      </div>
    </Link>
  );
};
