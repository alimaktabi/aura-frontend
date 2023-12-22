import RecoveryCodeScreen from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryCodeScreen';
import useRedirectAfterLogin from 'hooks/useRedirectAfterLogin';
import Splash from 'pages/Splash';
import { useEffect, useState } from 'react';
import { useSelector } from 'store/hooks';
import { selectIsLoggedIn } from 'store/profile/selectors';

const Login = () => {
  //TODO: save this on local storage so the splash is only seen once
  const userIsLogged = useSelector(selectIsLoggedIn);
  const redirectAfterLogin = useRedirectAfterLogin();
  useEffect(() => {
    if (userIsLogged) {
      redirectAfterLogin();
    }
  }, [redirectAfterLogin, userIsLogged]);

  const [splashSeen, setSplashSeen] = useState(false);
  return splashSeen ? (
    <RecoveryCodeScreen />
  ) : (
    <Splash dismissSplash={() => setSplashSeen(true)} />
  );
};

export default Login;
