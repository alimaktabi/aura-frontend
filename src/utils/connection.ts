import { ConnectionLevel } from 'types';

export const connectionLevelIcons: {
  [key in ConnectionLevel]: string;
} = {
  reported: 'sad-icon',
  suspicious: 'sad-icon',
  'just met': 'poker-icon',
  'already known': 'happy-icon',
  recovery: 'already-known-icon',
};
export const connectionLevelIconsBlack: {
  [key in ConnectionLevel]: string;
} = {
  reported: 'sad-icon',
  suspicious: 'sad-icon',
  'just met': 'poker-black-icon',
  'already known': 'happy-black-icon',
  recovery: 'already-known-icon-black',
};
