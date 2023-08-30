import user from './userSlice';
import keypair from './keypairSlice';
import operations from './operationsSlice';
import settings from './settingsSlice';
import recoveryData from 'BrightID/components/Onboarding/RecoveryFlow/recoveryDataSlice.ts';

export default {
  recoveryData,
  settings,
  operations,
  keypair,
  user,
};
