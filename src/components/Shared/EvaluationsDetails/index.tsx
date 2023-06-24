const EvaluationsDetails = () => {
  return (
    <div className="card flex flex-col gap-3">
      <div className="header__info flex flex-col gap-1">
        <ShowData title="Evaluations" value="23" details="(18 Pos / 5 Neg)" />
        <ShowData
          title="Calculated Score"
          value="32.32K"
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
  );
};

const ShowData = ({
  title,
  value,
  details,
}: {
  title: string;
  value: string;
  details: string;
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