import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { selectPreferredView } from 'store/profile/selectors';
import { PreferredView, ProfileViewAs } from 'types/dashboard';

export default function useViewMode() {
  const preferredViewMode = useSelector(selectPreferredView);
  const [query] = useSearchParams();
  const viewMode = useMemo(() => {
    const viewAs = query.get('viewas');
    if (viewAs === ProfileViewAs.SUBJECT) {
      return PreferredView.PLAYER;
    }
    if (viewAs === ProfileViewAs.PLAYER) {
      return PreferredView.TRAINER;
    }
    if (viewAs === ProfileViewAs.TRAINER) {
      return PreferredView.MANAGER;
    }
    if (viewAs === ProfileViewAs.MANAGER) {
      return PreferredView.MANAGER;
    }
    return preferredViewMode;
  }, [preferredViewMode, query]);
  const subjectViewModeTitle = useMemo(
    () =>
      ({
        [PreferredView.PLAYER]: 'Subject',
        [PreferredView.TRAINER]: 'Player',
        [PreferredView.MANAGER]: 'Trainer',
      }[viewMode]),
    [viewMode],
  );
  return {
    viewMode,
    subjectViewModeTitle,
  };
}
