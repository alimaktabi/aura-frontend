export type AuthData = {
  brightId: string;
  publicKey: string;
  privateKey: string;
};

export type AuthDataWithPassword = AuthData & {
  password: string;
};

export type ConnectionLevel =
  | 'reported'
  | 'suspicious'
  | 'just met'
  | 'already known'
  | 'recovery';

export type BrightIdConnection = {
  id: string;
  level: ConnectionLevel;
  reportReason: string | null;
  timestamp: number;
};

export type BrightIdConnectionsResponse = {
  data: {
    connections: BrightIdConnection[];
  };
};

export type Connection = BrightIdConnection &
  Partial<{
    name: string;
    connectionDate: number;
    photo: {
      filename: string;
    };
    status: 'verified';
    notificationToken: string;
    socialMedia: any[];
    verifications: any[];
    incomingLevel: ConnectionLevel;
  }>;

export type BrightIdBackup = {
  userData: {
    id: string;
    name: string;
    photo: {
      filename: string;
    };
  };
  connections: Connection[];
  groups: any[];
};

export type InboundEnergyAllocationItem = {
  fromBrightId: string;
  amount: number;
  scale: number;
};
export type InboundEnergyAllocationList = InboundEnergyAllocationItem[];
export type InboundEnergyAllocationRetrieveResponse = {
  energy: InboundEnergyAllocationList;
};

export type EnergyAllocationItem = {
  toBrightId: string;
  amount: number;
  scale: number;
};
export type EnergyAllocationList = EnergyAllocationItem[];
export type EnergyAllocationRetrieveResponse = {
  energy: EnergyAllocationList;
};
export type EnergyAllocationUpdateResponse = {
  energyAllocation: EnergyAllocationList;
};

export type AuraRating = {
  id: number;
  toBrightId: string;
  fromBrightId: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
};

export type AuraInboundConnectionAndRatingData = {
  fromSubjectId: string;
  name?: string;
  rating?: AuraRating;
  inboundConnection?: BrightIdConnection;
};

export type AuraRatingRetrieveResponse = {
  ratings: AuraRating[];
};
