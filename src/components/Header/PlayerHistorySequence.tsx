import { useSubjectName } from 'hooks/useSubjectName';
import { Link } from 'react-router-dom';
import { RoutePath } from 'types/router';

export const PlayerHistorySequence = ({
  playerHistorySequence,
}: {
  playerHistorySequence: string[];
}) => {
  return (
    <div className="flex bg-primary-l1 rounded w-full">
      <div className="rtl: flex flex-row min-w-full gap-1.5 py-3 overflow-scroll no-scrollbar first:pr-2.5 last:pl-2.5">
        {playerHistorySequence.map((item, i) => (
          <>
            <PlayerHistoryItem
              item={item}
              icon={'/assets/images/Shared/brightid-icon.svg'}
            />
            {i !== playerHistorySequence.length - 1 && (
              <img src="/assets/images/Header/play-icon.svg" alt="" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

const PlayerHistoryItem = ({ item, icon }: { item: string; icon: string }) => {
  const name = useSubjectName(item);
  return (
    <Link
      to={RoutePath.SUBJECT_PROFILE.replace(':subjectIdProp', item)}
      className="flex gap-1 items-center"
    >
      <img src={icon} alt="" width="10px" height="10px" />
      <p className="whitespace-nowrap text-black text-xs mr-1.5">{name}</p>
    </Link>
  );
};
