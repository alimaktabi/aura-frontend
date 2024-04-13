import * as React from 'react';

import {
  getViewModeBackgroundColorClass,
  getViewModeSubjectBackgroundColorClass,
  preferredViewIcon,
  subjectViewAsIcon,
  viewModeToViewAs,
} from '../../constants';
import useViewMode from '../../hooks/useViewMode';
import { useDispatch } from '../../store/hooks';
import { setPreferredView } from '../../store/profile';
import { PreferredView, ProfileViewAs } from '../../types/dashboard';

export const HeaderPreferedView = {
  ViewModeSwitch: () => {
    const { updateViewAs, currentViewMode } = useViewMode();

    return (
      <>
        {(
          [
            ProfileViewAs.SUBJECT,
            ProfileViewAs.PLAYER,
            ProfileViewAs.TRAINER,
          ] as const
        ).map((subjectViewMode) => (
          <div
            className={`p-1 rounded ${
              viewModeToViewAs[currentViewMode] === subjectViewMode
                ? getViewModeSubjectBackgroundColorClass(currentViewMode)
                : 'bg-gray100'
            } ml-2 cursor-pointer`}
            key={subjectViewMode}
            onClick={() => updateViewAs(subjectViewMode)}
          >
            <img
              className="w-4 h-4"
              src={subjectViewAsIcon[subjectViewMode]}
              alt=""
            />
          </div>
        ))}
      </>
    );
  },
  PreferedView: () => {
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
  },
};
