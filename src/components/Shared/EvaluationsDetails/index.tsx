import { useInboundConnections } from 'hooks/useSubjectConnections';
import { useSubjectInfo } from 'hooks/useSubjectInfo';

import { useInboundRatings } from '../../../hooks/useSubjectRatings';
import { compactFormat } from '../../../utils/number';

const EvaluationsDetails = ({
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
    useInboundRatings(subjectId);
  const { auraScore } = useSubjectInfo(subjectId);
  const { inboundConnections } = useInboundConnections(subjectId);

  return (
    <div className="card">
      {hasHeader && (
        <div className=" mb-4 font-bold text-lg text-black">{title}</div>
      )}

      <div className="flex flex-col gap-1.5">
        <ShowData
          title="Connections"
          value={inboundConnections?.length ?? '...'}
          details={null}
        />
        <div className="filters flex items-center justify-end gap-1">
          <span className="rounded border px-1 py-0.5 border-gray00 flex items-center gap-1">
            <img src="/assets/images/Shared/already-known-icon.svg" alt="" />
            <p className="text-sm text-black">
              {inboundConnections?.filter((conn) => conn.level === 'recovery')
                .length ?? '...'}
            </p>
          </span>
          <span className="rounded border px-1 py-0.5 border-gray00 flex items-center gap-1">
            <img src="/assets/images/Shared/happy-icon.svg" alt="" />
            <p className="text-sm text-black">
              {inboundConnections?.filter(
                (conn) => conn.level === 'already known',
              ).length ?? '...'}
            </p>
          </span>
          <span className="rounded border px-1 py-0.5 border-gray00 flex items-center gap-1">
            <img src="/assets/images/Shared/poker-icon.svg" alt="" />
            <p className="text-sm text-black">
              {inboundConnections?.filter((conn) => conn.level === 'just met')
                .length ?? '...'}
            </p>
          </span>
          <span className="rounded border px-1 py-0.5 border-gray00 flex items-center gap-1">
            <img src="/assets/images/Shared/sad-icon.svg" alt="" />
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
            value={inboundRatings?.length}
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
        <img
          className="body__chart w-full"
          src="/assets/images/chart-detailed.svg"
          alt=""
        />
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
