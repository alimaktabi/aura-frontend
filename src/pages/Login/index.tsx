import RecoveryCodeScreen from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryCodeScreen';
import Splash from 'pages/Splash';
import { useState } from 'react';

const Login = () => {
  //TODO: save this on local storage so the splash is only seen once
  const [splashSeen, setSplashSeen] = useState(false);
  return splashSeen ? (
    <RecoveryCodeScreen />
  ) : (
    <Splash dismissSplash={() => setSplashSeen(true)} />
  );
};

export default Login;
