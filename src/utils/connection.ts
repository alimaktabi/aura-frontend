import { ConnectionLevel } from 'types';

export const connectionLevelIcons: {
  [key in ConnectionLevel]: string;
} = {
  reported: 'suspicious-icon',
  suspicious: 'suspicious-icon',
  'just met': 'just-met-icon',
  'already known': 'already-known-icon',
  recovery: 'recovery-icon',
};
export const connectionLevelIconsBlack: {
  [key in ConnectionLevel]: string;
} = {
  reported: 'suspicious-icon',
  suspicious: 'suspicious-icon',
  'just met': 'just-met-icon',
  'already known': 'already-known-icon',
  recovery: 'recovery-icon',
};
