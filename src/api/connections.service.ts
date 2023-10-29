import { BrightIdConnectionsResponse } from 'types';

import { auraBrightIdNodeApi } from './index';

export const getInboundConnections = async (toBrightId: string) => {
  const res = await auraBrightIdNodeApi.get<BrightIdConnectionsResponse>(
    `/brightid/v6/users/${toBrightId}/connections/inbound`,
  );
  return res.data.data.connections;
};

export const getOutboundConnections = async (toBrightId: string) => {
  const res = await auraBrightIdNodeApi.get<BrightIdConnectionsResponse>(
    `/brightid/v6/users/${toBrightId}/connections/outbound`,
  );
  return res.data.data.connections;
};
