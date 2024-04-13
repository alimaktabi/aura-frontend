import * as React from 'react';

import {
  getViewModeBackgroundColorClass,
  preferredViewIcon,
} from '../../constants';
import useViewMode from '../../hooks/useViewMode';
import { useDispatch } from '../../store/hooks';
import { setPreferredView } from '../../store/profile';
import { PreferredView } from '../../types/dashboard';

export const HeaderPreferedView = () => {
  const { currentViewMode } = useViewMode();
  const dispatch = useDispatch();

  return (
    <>
      {Object.values(PreferredView).map((viewMode) => (
        <div
          className={`p-1 rounded ${
            currentViewMode === viewMode
              ? getViewModeBackgroundColorClass(currentViewMode)
              : 'bg-gray100'
          } ml-2 cursor-pointer`}
          key={viewMode}
          onClick={() => dispatch(setPreferredView(viewMode))}
        >
          <img className="w-4 h-4" src={preferredViewIcon[viewMode]} alt="" />
        </div>
      ))}
    </>
  );
};
