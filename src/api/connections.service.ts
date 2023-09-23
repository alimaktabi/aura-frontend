import { AxiosInstance, AxiosResponse } from 'axios';
import { CONNECTION_SEARCH_SEED } from 'constants/index';
import {
  AuraConnectionsResponse,
  AuraProfile,
  AuraPublicProfile,
  BrightIdConnectionsResponse,
} from 'types';
import { encryptDataWithPrivateKey } from 'utils/encryptWithPrivateKey';

import { backendApi, brightIdNodeApi } from './index';

export const getConnections = (
  backendApi: AxiosInstance,
  fromBrightId: string,
) => {
  return backendApi.get<AuraConnectionsResponse>('/v1/connections/search', {
    params: {
      fromBrightId,
      seed: CONNECTION_SEARCH_SEED,
    },
  });
};

export const getInboundConnections = async (toBrightId: string) => {
  const res = await brightIdNodeApi.get<BrightIdConnectionsResponse>(
    `/node/v6/users/${toBrightId}/connections/inbound`,
  );
  return res.data.data.connections;
};

export const getOutboundConnections = async (toBrightId: string) => {
  const res = await brightIdNodeApi.get<BrightIdConnectionsResponse>(
    `/node/v6/users/${toBrightId}/connections/outbound`,
  );
  return res.data.data.connections;
};

type ProfileApiResponse = AxiosResponse<AuraProfile | AuraPublicProfile>;
export const getProfile = async (brightId: string, isPublic = true) => {
  let res: ProfileApiResponse;
  const privateRoute = '/v1/profile/';
  const publicRoute = '/v1/profile/public/';
  const route = isPublic ? publicRoute : privateRoute;
  try {
    // TODO: write seperated service for public profile
    res = await backendApi.get<AuraProfile | AuraPublicProfile>(
      route + brightId,
    );
  } catch (error: any) {
    if (error?.response?.status === 500) {
      res = await backendApi.get<AuraPublicProfile>(publicRoute + brightId);
    } else {
      throw new Error('profile is not defined');
    }
  }
  return { ...res.data, isPublic: true };
};

export const setNickname = (
  backendApi: AxiosInstance,
  {
    fromBrightId,
    toBrightId,
    nickname,
  }: {
    fromBrightId: string;
    toBrightId: string;
    nickname: string;
  },
) => {
  const endpoint = '/v1/nickname/';
  const URL = `${endpoint}${fromBrightId}/${toBrightId}`;

  const encryptedData = {
    nickname,
  };

  const encryptedNickname = encryptDataWithPrivateKey(encryptedData);
  return backendApi.post(URL, {
    encryptedNickname,
  });
};
