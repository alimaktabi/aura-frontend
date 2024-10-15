import ReactECharts from 'echarts-for-react';
import { useSubjectVerifications } from 'hooks/useSubjectVerifications';
import { useContext } from 'react';

import ProgressBar from '../../../components/Shared/ProgressBar';
import {
  viewModeToEvaluatorViewMode,
  viewModeToViewAs,
} from '../../../constants';
import { EchartsContext } from '../../../contexts/EchartsContext';
import { useSubjectInboundEvaluationsContext } from '../../../contexts/SubjectInboundEvaluationsContext';
import useViewMode from '../../../hooks/useViewMode';
import { compactFormat } from '../../../utils/number';

const EvaluationsDetailsPerformance = ({
  subjectId,
  title = '',
  hasHeader = false,
  hasBtn = false,
}: {
  subjectId: string;
  hasHeader?: boolean;
  hasBtn?: boolean;
  title?: string;
}) => {
  const { currentViewMode } = useViewMode();
  const { ratings: inboundRatings, inboundRatingsStatsString } =
    useSubjectInboundEvaluationsContext({ subjectId });
  const { auraScore } = useSubjectVerifications(
    subjectId,
    viewModeToViewAs[viewModeToEvaluatorViewMode[currentViewMode]],
  );

  const { options } = useContext(EchartsContext);

  return (
    <div className="card relative">
      <div className="absolute px-11 left-0 right-0 top-0 bottom-0 backdrop-blur-[2px] z-50 rounded-[10px] bg-white bg-opacity-75 flex flex-col items-center justify-center gap-6">
        {Math.random() > 0.5 ? (
          <>
            <img src="/assets/images/Shared/lock.svg" alt="" />
            <p className="text-[20px] font-medium text-center">
              You need to evaluate <strong>2</strong> more subjects to start
              getting feedback from trainers
            </p>
            <ProgressBar progress={30} className="w-full" />
          </>
        ) : (
          <>
            <p className="text-[20px] font-medium text-center">
              Congratulations! With 3 evaluations completed, you&apos;re now
              ready to connect with trainers, receive valuable feedback, and
              level up
            </p>
            <button className="btn w-full">Start Finding Trainers</button>
          </>
        )}
      </div>
      {hasHeader && (
        <div className=" mb-4 font-bold text-lg text-black">{title}</div>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="header__info flex flex-col gap-1">
          <ShowData
            title="Evaluations"
            value={inboundRatings?.filter((r) => Number(r.rating)).length}
            details={
              inboundRatingsStatsString
                ? `(${inboundRatingsStatsString})`
                : undefined
            }
          />
          <ShowData
            title="Calculated Score"
            value={auraScore ? compactFormat(auraScore) : '-'}
            details="(2.82K / -500)"
          />
        </div>
        <div className="body__info flex justify-between w-full mb-2.5 mt-1.5">
          <div className="font-medium">Evaluation Impact:</div>
          <div className="underline text-sm text-gray00">What&apos;s this?</div>
        </div>

        <ReactECharts option={options} className="w-full h-40" />
        <div id="chart-container" className=""></div>
      </div>
      {hasBtn && (
        <>
          <button className="btn--outlined btn--medium mt-4">
            View All Evaluations
          </button>
          <button className="btn mt-3">Find New Trainer</button>
        </>
      )}
    </div>
  );
};

const ShowData = ({
  title,
  value,
  details,
}: {
  title: string | number | null | undefined;
  value: string | number | null | undefined;
  details: string | number | null | undefined;
}) => {
  return (
    <div className="flex justify-between w-full">
      <div className="font-medium">{title}:</div>
      <div>
        <span className="font-medium">{value} </span>
        <span>{details}</span>
      </div>
    </div>
  );
};

export default EvaluationsDetailsPerformance;
