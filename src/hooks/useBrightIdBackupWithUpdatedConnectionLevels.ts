import { useMyEvaluationsContext } from 'contexts/MyEvaluationsContext';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectBrightIdBackup } from 'store/profile/selectors';
import { BrightIdBackup, Connection } from 'types';

export default function useBrightIdBackupWithUpdatedConnectionLevels(): BrightIdBackup | null {
  const brightIdBackup = useSelector(selectBrightIdBackup);
  const { myConnections } = useMyEvaluationsContext();

  return useMemo(() => {
    if (brightIdBackup === null || myConnections === null) return null;
    const connections: Connection[] = [];
    myConnections.forEach((c) => {
      const connectionInBrightIdBackup = brightIdBackup.connections.find(
        (mc) => mc.id === c.id,
      );
      connections.push({
        ...connectionInBrightIdBackup,
        ...c,
      });
    });
    return {
      ...brightIdBackup,
      connections,
    };
  }, [brightIdBackup, myConnections]);
}
