import { ConnectionLevel } from 'types';

export const connectionLevelAbbreviation: {
  [key in ConnectionLevel]: string;
} = {
  reported: 'Reported',
  suspicious: 'S',
  'already known': 'AK',
  'just met': 'JM',
  recovery: 'R',
};

export function getConnectionLevelAbbreviation(level?: ConnectionLevel) {
  if (!level) return 'N/A';
  return connectionLevelAbbreviation[level];
}
