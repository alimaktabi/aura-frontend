import recoveryData from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice';

import keypair from './keypairSlice';
import operations from './operationsSlice';
import settings from './settingsSlice';
import user from './userSlice';

const reducers = {
  recoveryData,
  settings,
  operations,
  keypair,
  user,
};
export default reducers;
