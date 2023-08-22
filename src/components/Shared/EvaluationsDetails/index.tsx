import { useInboundRatings } from '../../../hooks/useSubjectRatings.ts';
import { useSubjectBasicInfo } from '../../../hooks/useSubjectBasicInfo.ts';
import { compactFormat } from '../../../utils/number.ts';

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
  const { auraScore } = useSubjectBasicInfo(subjectId);
  return (
    <div className="card">
      {hasHeader && (
        <div className=" mb-4 font-bold text-lg text-black">{title}</div>
      )}

      <div className="flex flex-col gap-3">
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
          <div className="underline text-sm text-gray00">What's this?</div>
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
