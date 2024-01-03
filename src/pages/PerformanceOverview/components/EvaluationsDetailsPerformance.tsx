import { useEffect } from 'react';

import { useSubjectInboundEvaluationsContext } from '../../../contexts/SubjectInboundEvaluationsContext';
import useEcharts from '../../../hooks/useEcharts';
import { useSubjectInfo } from '../../../hooks/useSubjectInfo';
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
  const { inboundRatings, inboundRatingsStatsString } =
    useSubjectInboundEvaluationsContext(subjectId);
  const { auraScore } = useSubjectInfo(subjectId);

  const { echarts, options } = useEcharts();

  useEffect(() => {
    if (echarts) {
      setTimeout(() => {
        echarts
          .init(document.getElementById('chart-container') as HTMLDivElement)
          .setOption(options);
      }, 1000);
    }
  }, [echarts, options]);

  return (
    <div className="card">
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

        <div id="chart-container" className="w-full h-40"></div>
      </div>
      {hasBtn && (
        <>
          <button className="btn--outlined mt-4">View All Evaluations</button>
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
