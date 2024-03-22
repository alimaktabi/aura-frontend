import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { selectPreferredView } from 'store/profile/selectors';
import { PreferredView } from 'types/dashboard';

export default function useViewMode() {
  const preferredViewMode = useSelector(selectPreferredView);
  const [query] = useSearchParams();
  const viewMode = useMemo(
    () => (query.get('viewmode') || preferredViewMode) as PreferredView,
    [preferredViewMode, query],
  );
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
