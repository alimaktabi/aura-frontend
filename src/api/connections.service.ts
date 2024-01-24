import { AuraNodeConnectionsResponse } from 'types';

import { auraBrightIdNodeApi } from './index';

export const getInboundConnections = async (toBrightId: string) => {
  const res = await auraBrightIdNodeApi.get<AuraNodeConnectionsResponse>(
    `/brightid/v6/users/${toBrightId}/connections/inbound?withVerifications=true`,
  );
  return res.data.data.connections;
};

export const getOutboundConnections = async (toBrightId: string) => {
  const res = await auraBrightIdNodeApi.get<AuraNodeConnectionsResponse>(
    `/brightid/v6/users/${toBrightId}/connections/outbound?withVerifications=true`,
  );
  return res.data.data.connections;
};
