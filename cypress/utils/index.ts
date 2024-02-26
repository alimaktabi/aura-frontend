import {
  AuraNodeBrightIdConnection,
  AuraNodeBrightIdConnectionWithBackupData,
  ConnectionLevel,
} from 'types';

import { BRIGHT_ID_BACKUP } from './data';

export const getTestSelector = (selectorId: string) =>
  `[data-testid=${selectorId}]`;

export const getTestSelectorStartsWith = (selectorId: string) =>
  `[data-testid^=${selectorId}]`;

export function getConnectionIndex(id: string) {
  return BRIGHT_ID_BACKUP.connections.findIndex((c) => c.id === id);
}

export const toConnectionFormat = (
  connection: AuraNodeBrightIdConnectionWithBackupData,
  level?: ConnectionLevel,
): AuraNodeBrightIdConnection => ({
  id: connection.id,
  level: level || connection.level,
  reportReason: connection.reportReason,
  timestamp: connection.timestamp,
  verifications: connection.verifications,
});
