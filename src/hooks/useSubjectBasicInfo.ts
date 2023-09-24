import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  selectAuthData,
  selectBrightIdBackup,
} from '../store/profile/selectors';

export const useSubjectBasicInfo = (subjectId: string | null | undefined) => {
  const authData = useSelector(selectAuthData);
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const isOwn = useMemo(() => {
    return subjectId === authData?.brightId;
  }, [authData?.brightId, subjectId]);

  const connectionInfo = useMemo(
    () => brightIdBackup?.connections.find((conn) => conn.id === subjectId),
    [brightIdBackup?.connections, subjectId],
  );
  const profileInfo = useMemo(
    () => (isOwn ? brightIdBackup?.userData : connectionInfo),
    [brightIdBackup?.userData, connectionInfo, isOwn],
  );

  return {
    name: profileInfo?.name ?? profileInfo?.id ?? 'Unknown User',
    isConnection: !!connectionInfo,
  };
};
