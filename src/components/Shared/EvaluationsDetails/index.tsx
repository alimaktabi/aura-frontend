import { useSubjectInboundEvaluationsContext } from 'contexts/SubjectInboundEvaluationsContext';
import ReactECharts from 'echarts-for-react';
import { AuraFilterId } from 'hooks/useFilters';
import { useSubjectInfo } from 'hooks/useSubjectInfo';
import { useContext, useState } from 'react';
import { connectionLevelIcons } from 'utils/connection';

import { EchartsContext } from '../../../contexts/EchartsContext';
import { compactFormat } from '../../../utils/number';

const EvaluationsDetails = ({
  subjectId,
  title = '',
  showEvidenceList,
  hasHeader = false,
  hasBtn = false,
}: {
  subjectId: string;
  showEvidenceList?: () => void;
  hasHeader?: boolean;
  hasBtn?: boolean;
  title?: string;
}) => {
  const { inboundRatings, inboundRatingsStatsString, inboundConnections } =
    useSubjectInboundEvaluationsContext(subjectId);
  const { auraScore } = useSubjectInfo(subjectId);

  const [selectedLevel, setSelectedLevel] = useState(1);

  const { toggleFilterById } = useSubjectInboundEvaluationsContext(subjectId);

  const { echarts, options } = useContext(EchartsContext);

  const setEvidenceListFilter = (filterId: AuraFilterId) => {
    toggleFilterById(filterId, true);
    showEvidenceList?.();
  };
  return (
    <div className="card">
      {hasHeader && (
        <div className=" mb-4 font-bold text-lg text-black">{title}</div>
      )}

      <div className="flex flex-col gap-1.5">
        {/*<ShowData*/}
        {/*  title="Connections"*/}
        {/*  value={inboundConnections?.length ?? '...'}*/}
        {/*  details={null}*/}
        {/*/>*/}
        <div className="flex justify-between w-full">
          <p className="font-medium">Connections:</p>
          <div className="flex gap-1">
            <span
              onClick={() => setSelectedLevel(1)}
              className={`rounded cursor-pointer text-black min-w-[36px] justify-center border px-1 py-0.5 border-gray00 flex items-center gap-1 ${
                selectedLevel === 1 && '!bg-pastel-purple !text-white !border-0'
              }`}
            >
              <p className="text-sm font-medium">All</p>
            </span>
            <span
              onClick={() => setSelectedLevel(2)}
              className={`rounded cursor-pointer text-black min-w-[36px] justify-center border px-1 py-0.5 border-gray00 flex items-center gap-1 ${
                selectedLevel === 2 && '!bg-pastel-purple !text-white !border-0'
              }`}
            >
              <p className="text-sm font-medium">Lvl 1</p>
            </span>
            <span
              onClick={() => setSelectedLevel(3)}
              className={`rounded cursor-pointer text-black min-w-[36px] justify-center border px-1 py-0.5 border-gray00 flex items-center gap-1 ${
                selectedLevel === 3 && '!bg-pastel-purple !text-white !border-0'
              }`}
            >
              <p className="text-sm font-medium">Lvl 2</p>
            </span>
            <span
              onClick={() => setSelectedLevel(4)}
              className={`rounded cursor-pointer text-black min-w-[36px] justify-center border px-1 py-0.5 border-gray00 flex items-center gap-1 ${
                selectedLevel === 4 && '!bg-pastel-purple !text-white !border-0'
              }`}
            >
              <p className="text-sm font-medium">Lvl 3</p>
            </span>
          </div>
        </div>
        <div className="filters flex items-center justify-end gap-1">
          <span
            className="rounded cursor-pointer border px-1 py-0.5 border-gray00 flex items-center gap-1"
            onClick={() =>
              setEvidenceListFilter(
                AuraFilterId.EvaluationConnectionTypeRecovery,
              )
            }
          >
            <img
              src={`/assets/images/Shared/${connectionLevelIcons.recovery}.svg`}
              alt=""
            />
            <p className="text-sm text-black">
              {inboundConnections?.filter((conn) => conn.level === 'recovery')
                .length ?? '...'}
            </p>
          </span>
          <span
            className="rounded cursor-pointer border px-1 py-0.5 border-gray00 flex items-center gap-1"
            onClick={() =>
              setEvidenceListFilter(
                AuraFilterId.EvaluationConnectionTypeAlreadyKnown,
              )
            }
          >
            <img
              src={`/assets/images/Shared/${connectionLevelIcons['already known']}.svg`}
              alt=""
            />
            <p className="text-sm text-black">
              {inboundConnections?.filter(
                (conn) => conn.level === 'already known',
              ).length ?? '...'}
            </p>
          </span>
          <span
            className="rounded cursor-pointer border px-1 py-0.5 border-gray00 flex items-center gap-1"
            onClick={() =>
              setEvidenceListFilter(
                AuraFilterId.EvaluationConnectionTypeJustMet,
              )
            }
          >
            <img
              src={`/assets/images/Shared/${connectionLevelIcons['just met']}.svg`}
              alt=""
            />
            <p className="text-sm text-black">
              {inboundConnections?.filter((conn) => conn.level === 'just met')
                .length ?? '...'}
            </p>
          </span>
          <span
            className="rounded cursor-pointer border px-1 py-0.5 border-gray00 flex items-center gap-1"
            onClick={() =>
              setEvidenceListFilter(
                AuraFilterId.EvaluationConnectionTypeSuspiciousOrReported,
              )
            }
          >
            <img
              src={`/assets/images/Shared/${connectionLevelIcons.suspicious}.svg`}
              alt=""
            />
            <p className="text-sm text-black">
              {inboundConnections?.filter(
                (conn) =>
                  conn.level === 'suspicious' || conn.level === 'reported',
              ).length ?? '...'}
            </p>
          </span>
        </div>
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
        <div className="body__info flex justify-between w-full">
          <div className="font-medium">Evaluation Impact:</div>
          <div className="underline text-sm text-gray00">What&apos;s this?</div>
        </div>

        <ReactECharts option={options} className="body__chart w-full mb-3" />

        <div className="chart-info flex flex-wrap gap-y-2.5 mb-5">
          <div className="chart-info__item flex items-center gap-1 w-1/2">
            <div className="chart-info__item__color w-[22px] h-[11px] rounded bg-[#E2E2E2]"></div>
            <div className="chart-info__item__text text-xs font-bold">
              Low Confidence
            </div>
          </div>
          <div className="chart-info__item flex items-center gap-1 w-1/2">
            <div className="chart-info__item__color w-[22px] h-[11px] rounded bg-[#B5B5B5]"></div>
            <div className="chart-info__item__text text-xs font-bold">
              Medium Confidence
            </div>
          </div>
          <div className="chart-info__item flex items-center gap-1 w-1/2">
            <div className="chart-info__item__color w-[22px] h-[11px] rounded bg-[#7A7A7A]"></div>
            <div className="chart-info__item__text text-xs font-bold">
              High Confidence
            </div>
          </div>
          <div className="chart-info__item flex items-center gap-1 w-1/2">
            <div className="chart-info__item__color w-[22px] h-[11px] rounded bg-[#404040]"></div>
            <div className="chart-info__item__text text-xs font-bold">
              Very High Confidence
            </div>
          </div>
        </div>

        <p className="font-medium italic text-sm text-black">
          *This chart displays the top 10 impacts players have on the subject
          score
        </p>
      </div>
      {hasBtn && <button className="btn mt-4">View All Evaluations</button>}
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

export default EvaluationsDetails;
