import { connectionLevelMap } from 'constants/index';
import {
  AuraNodeBrightIdConnection,
  AuraNodeConnectionsResponse,
  AuraRating,
  BrightIdConnection,
} from 'types';

import {
  justMet2,
  justMet3,
  ratedConnection,
  ratedConnection2,
  ratedConnection3,
  ratedConnectionNegative,
  ratedConnectionWithoutEnergy,
  unratedConnection,
} from './data';
import { toConnectionFormat } from './index';

export const connectionToVisit = unratedConnection;

export const connectionIncomingConnections: AuraNodeBrightIdConnection[] = [
  toConnectionFormat(ratedConnection, 'suspicious'),
  toConnectionFormat(ratedConnection2, 'already known'),
  toConnectionFormat(ratedConnection3, 'just met'),
  toConnectionFormat(ratedConnectionNegative, 'suspicious'),
  toConnectionFormat(ratedConnectionWithoutEnergy, 'recovery'),
  toConnectionFormat(justMet3, 'reported'),
];

export const connectionOutboundConnections: AuraNodeBrightIdConnection[] = [
  toConnectionFormat(ratedConnection, 'recovery'),
  toConnectionFormat(ratedConnection2, 'suspicious'),
  toConnectionFormat(ratedConnection3, 'just met'),
  toConnectionFormat(ratedConnectionNegative, 'suspicious'),
  toConnectionFormat(ratedConnectionWithoutEnergy, 'already known'),
  toConnectionFormat(justMet3, 'reported'),
];

export const connectionIncomingConnectionsResponse: AuraNodeConnectionsResponse =
  {
    data: {
      connections: connectionIncomingConnections,
    },
  };

export const connectionOutboundConnectionsResponse: AuraNodeConnectionsResponse =
  {
    data: {
      connections: connectionOutboundConnections,
    },
  };

export const connectionIncomingRatings: AuraRating[] = [
  {
    id: 5050,
    toBrightId: connectionToVisit.id,
    fromBrightId: justMet3.id,
    rating: '-1',
    createdAt: '2021-07-10T20:59:03.036Z',
    updatedAt: '2021-07-12T20:59:03.036Z',
  },
  {
    id: 5090,
    toBrightId: connectionToVisit.id,
    fromBrightId: ratedConnection.id,
    rating: '-4',
    createdAt: '2021-07-10T20:59:03.036Z',
    updatedAt: '2021-07-12T23:59:03.036Z',
  },
  {
    id: 3040,
    toBrightId: connectionToVisit.id,
    fromBrightId: ratedConnectionWithoutEnergy.id,
    rating: '4',
    createdAt: '2021-07-13T20:59:03.036Z',
    updatedAt: '2021-07-15T20:59:03.036Z',
  },
  {
    id: 6000,
    toBrightId: connectionToVisit.id,
    fromBrightId: ratedConnectionNegative.id,
    rating: '-1',
    createdAt: '2021-07-11T20:59:03.036Z',
    updatedAt: '2021-07-11T10:59:03.036Z',
  },
  {
    id: 6070,
    toBrightId: connectionToVisit.id,
    fromBrightId: justMet2.id,
    rating: '-1',
    createdAt: '2021-07-11T20:59:03.036Z',
    updatedAt: '2021-07-11T10:59:03.036Z',
  },
];

export const connectionIncomingRatingsResponse: {
  ratings: AuraRating[];
} = {
  ratings: connectionIncomingRatings,
};

export const connectionIncomingConnectionsSortByConnectionLevelDescending = [
  ...connectionIncomingConnections,
].sort(
  (a, b) =>
    (connectionLevelMap[b.level] ?? 0) - (connectionLevelMap[a.level] ?? 0),
);

const getIncomingRatingFrom = (connection: BrightIdConnection) =>
  Number(
    connectionIncomingRatings.find((r) => r.fromBrightId === connection.id)
      ?.rating || 0,
  );

export const connectionIncomingConnectionsSortByTheirRatingDescending = [
  ...connectionIncomingConnections,
].sort((a, b) => getIncomingRatingFrom(b) - getIncomingRatingFrom(a));
