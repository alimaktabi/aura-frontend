import { viewAsToViewMode } from 'constants/index';
import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import { selectPreferredView } from 'store/profile/selectors';
import { PreferredView, ProfileViewAs } from 'types/dashboard';

export default function useViewMode() {
  const preferredViewMode = useSelector(selectPreferredView);
  const [query] = useSearchParams();
  const currentViewMode = useMemo(() => {
    const viewAs = query.get('viewas');
    if (viewAs && (Object.values(ProfileViewAs) as string[]).includes(viewAs)) {
      return viewAsToViewMode[viewAs as ProfileViewAs];
    }
    return preferredViewMode;
  }, [preferredViewMode, query]);
  const subjectViewModeTitle = useMemo(
    () =>
      ({
        [PreferredView.PLAYER]: 'Subject',
        [PreferredView.TRAINER]: 'Player',
        [PreferredView.MANAGER]: 'Trainer',
      }[currentViewMode]),
    [currentViewMode],
  );

  const location = useLocation();
  const navigate = useNavigate();
  const updateViewAs = (value: ProfileViewAs) => {
    // Create a new URLSearchParams object based on the current query string
    const searchParams = new URLSearchParams(location.search);

    // Set the new or update the existing query parameter
    searchParams.set('viewas', value);

    // Navigate to the same route with the new query string
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return {
    currentViewMode,
    updateViewAs,
    subjectViewModeTitle,
  };
}