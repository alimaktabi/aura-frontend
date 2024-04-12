import { auraBrightIdNodeApi } from './index';

export type AuraVerification = 'Bronze' | 'Silver' | 'Gold';
export type AuraVerificationString = AuraVerification | '-';

export type Verifications = {
  name: string;
  block: number;
  timestamp: number;
  level?: AuraVerification;
  score?: number;
}[];

//TODO: complete based on this: https://brightid.stoplight.io/docs/node-api/5f925a7124856-gets-profile-information-of-a-user
export interface BrightIdProfile {
  createdAt: number;
  verifications: Verifications;
}

export const getAuraVerificationStringFromVerificationsResponse = (
  data?: Verifications,
) => {
  const auraVerification = data?.find(
    (verification) => verification.name === 'Aura',
  );
  return auraVerification?.level || '-';
};

export const getVerifications = async (userId: string) => {
  const res = await auraBrightIdNodeApi.get<{
    data: { verifications: Verifications };
  }>(`/brightid/v6/users/${userId}/verifications`);
  return res.data;
};

export const getBrightIdProfile = async (userId: string) => {
  const res = await auraBrightIdNodeApi.get<{
    data: BrightIdProfile;
  }>(`/brightid/v6/users/${userId}/profile`);
  return res.data;
};

export const getAuraVerificationString = async (
  userId: string,
): Promise<AuraVerificationString> => {
  const res = await getVerifications(userId);
  return getAuraVerificationStringFromVerificationsResponse(
    res.data?.verifications,
  );
};
