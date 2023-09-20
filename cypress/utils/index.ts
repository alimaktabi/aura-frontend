import { BRIGHT_ID_BACKUP } from './data';

export const getTestSelector = (selectorId: string) =>
  `[data-testid=${selectorId}]`;

export const getTestSelectorStartsWith = (selectorId: string) =>
  `[data-testid^=${selectorId}]`;

export function getConnectionIndex(id: string) {
  return BRIGHT_ID_BACKUP.connections.findIndex((c) => c.id === id);
}
