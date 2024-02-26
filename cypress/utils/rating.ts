import { AuraNodeConnectionsResponse, AuraRating } from 'types';

import {
  FAKE_BRIGHT_ID,
  justMet,
  justMet2,
  justMet3,
  RANDOM_TIMESTAMP,
  ratedConnection,
  ratedConnection2,
  ratedConnection3,
  ratedConnectionNegative,
  ratedConnectionWithoutEnergy,
  SAMPLE_AURA_VERIFICATION_OBJECT,
  unratedConnection,
} from './data';
import { toConnectionFormat } from './index';

export const oldRatings: AuraRating[] = [
  {
    id: 5050,
    toBrightId: ratedConnection.id,
    fromBrightId: FAKE_BRIGHT_ID,
    rating: '4',
    createdAt: '2021-07-10T20:59:03.036Z',
    updatedAt: '2021-07-12T20:59:03.036Z',
  },
  {
    id: 5050,
    toBrightId: ratedConnection2.id,
    fromBrightId: FAKE_BRIGHT_ID,
    rating: '2',
    createdAt: '2021-07-10T20:59:03.036Z',
    updatedAt: '2021-07-12T23:59:03.036Z',
  },
  {
    id: 5050,
    toBrightId: ratedConnection3.id,
    fromBrightId: FAKE_BRIGHT_ID,
    rating: '3',
    createdAt: '2021-07-11T20:59:03.036Z',
    updatedAt: '2021-07-11T20:59:03.036Z',
  },
  {
    id: 3040,
    toBrightId: ratedConnectionWithoutEnergy.id,
    fromBrightId: FAKE_BRIGHT_ID,
    rating: '1',
    createdAt: '2021-07-13T20:59:03.036Z',
    updatedAt: '2021-07-15T20:59:03.036Z',
  },
  {
    id: 6070,
    toBrightId: ratedConnectionNegative.id,
    fromBrightId: FAKE_BRIGHT_ID,
    rating: '-1',
    createdAt: '2021-07-11T20:59:03.036Z',
    updatedAt: '2021-07-11T10:59:03.036Z',
  },
];

export const incomingRatings: AuraRating[] = [
  {
    id: 6040,
    toBrightId: FAKE_BRIGHT_ID,
    fromBrightId: ratedConnection.id,
    rating: '4',
    createdAt: '2021-07-10T20:59:03.036Z',
    updatedAt: '2021-07-12T20:59:03.036Z',
  },
  {
    id: 2030,
    toBrightId: FAKE_BRIGHT_ID,
    fromBrightId: ratedConnection2.id,
    rating: '2',
    createdAt: '2021-07-10T20:59:03.036Z',
    updatedAt: '2021-07-12T23:59:03.036Z',
  },
];

export function getRatingObject(brightId: string, ratings: AuraRating[]) {
  return ratings.find((r) => r.toBrightId === brightId);
}

export function getRating(brightId: string, ratings: AuraRating[]) {
  return getRatingObject(brightId, ratings)?.rating;
}

export const newRatings: AuraRating[] = [
  {
    ...getRatingObject(ratedConnection.id, oldRatings)!,
    rating: '-2',
    updatedAt: '2021-07-16T20:59:03.036Z',
  },
  {
    ...getRatingObject(ratedConnection2.id, oldRatings)!,
  },
  {
    ...getRatingObject(ratedConnection3.id, oldRatings)!,
  },
  {
    ...getRatingObject(ratedConnectionWithoutEnergy.id, oldRatings)!,
  },
  {
    ...getRatingObject(ratedConnectionNegative.id, oldRatings)!,
    rating: '1',
    updatedAt: '2021-07-13T20:59:03.036Z',
  },
  {
    id: 7080,
    toBrightId: unratedConnection.id,
    fromBrightId: FAKE_BRIGHT_ID,
    rating: '4',
    createdAt: '2021-07-17T20:59:03.036Z',
    updatedAt: '2021-07-17T20:59:03.036Z',
  },
];
export const userRatingsResponse: {
  ratings: AuraRating[];
} = {
  ratings: oldRatings,
};

export const userIncomingRatingsResponse: {
  ratings: AuraRating[];
} = {
  ratings: incomingRatings,
};

const userConnections = [
  ratedConnection,
  ratedConnection2,
  ratedConnection3,
  unratedConnection,
  ratedConnectionNegative,
  ratedConnectionWithoutEnergy,
  justMet3,
  justMet,
  justMet2,
];
export const userOutboundConnectionsResponse: AuraNodeConnectionsResponse = {
  data: {
    connections: userConnections.map((c) => toConnectionFormat(c)),
  },
};
export const userInboundConnectionsResponse: AuraNodeConnectionsResponse = {
  data: {
    connections: Array(9).fill({
      id: FAKE_BRIGHT_ID,
      level: 'just met',
      timestamp: RANDOM_TIMESTAMP,
      verifications: [SAMPLE_AURA_VERIFICATION_OBJECT],
      reportReason: null,
    }),
  },
};

export const connectionsInConnectionsPageDefaultFilter = [
  ...[justMet, justMet2, unratedConnection, justMet3].sort(
    (a, b) =>
      new Date(b.timestamp ?? 0).getTime() -
      new Date(a.timestamp ?? 0).getTime(),
  ),
  ...[
    ratedConnection,
    ratedConnection2,
    ratedConnection3,
    ratedConnectionNegative,
    ratedConnectionWithoutEnergy,
  ].sort(
    (a, b) =>
      new Date(b.timestamp ?? 0).getTime() -
      new Date(a.timestamp ?? 0).getTime(),
  ),
];

export const connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending =
  [...connectionsInConnectionsPageDefaultFilter].sort(
    (a, b) =>
      new Date(a.timestamp ?? 0).getTime() -
      new Date(b.timestamp ?? 0).getTime(),
  );

export const connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateDescending =
  [
    ...connectionsInConnectionsPageFilterAllSortedByLastConnectionUpdateAscending,
  ].reverse();

export const connectionsInConnectionsPageAlreadyKnownPlus =
  connectionsInConnectionsPageDefaultFilter.filter(
    (user) => user.level === 'already known' || user.level === 'recovery',
  );

export const connectionsInConnectionsPageJustMet =
  connectionsInConnectionsPageDefaultFilter.filter(
    (user) => user.level === 'just met',
  );

export const connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateAscending =
  [...connectionsInConnectionsPageJustMet].sort(
    (a, b) =>
      new Date(a.timestamp ?? 0).getTime() -
      new Date(b.timestamp ?? 0).getTime(),
  );

export const connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateDescending =
  [
    ...connectionsInConnectionsPageJustMetSortedByLastConnectionUpdateAscending,
  ].reverse();
