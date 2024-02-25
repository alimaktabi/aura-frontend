export const PlayerHistorySequence = () => {
  return (
    <div className="flex bg-primary-l1 rounded w-full">
      <div className="rtl: flex flex-row-reverse min-w-full gap-1.5 py-3 overflow-scroll no-scrollbar first:pr-2.5 last:pl-2.5">
        <HistoryPlayerName
          player={'Ali Beigi'}
          icon={'/assets/images/Shared/brightid-icon.svg'}
        />
        <img src="/assets/images/Header/play-icon.svg" alt="" />
        <HistoryPlayerName
          player={'Sina Parvizi'}
          icon={'/assets/images/Player.svg'}
        />
        <img src="/assets/images/Header/play-icon.svg" alt="" />
        <HistoryPlayerName
          player={'Adam Stallard'}
          icon={'/assets/images/Shared/brightid-icon.svg'}
        />
        <img src="/assets/images/Header/play-icon.svg" alt="" />
        <HistoryPlayerName
          player={'James Fields'}
          icon={'/assets/images/Shared/brightid-icon.svg'}
        />
      </div>
    </div>
  );
};

const HistoryPlayerName = ({
  player,
  icon,
}: {
  player: string;
  icon: string;
}) => {
  return (
    <div className="flex gap-1 items-center">
      <img src={icon} alt="" width="10px" height="10px" />
      <p className="whitespace-nowrap text-black text-xs mr-1.5">{player}</p>
    </div>
  );
};
