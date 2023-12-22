import RecoveryCodeScreen from 'BrightID/components/Onboarding/RecoveryFlow/RecoveryCodeScreen';
import useRedirectAfterLogin from 'hooks/useRedirectAfterLogin';
import Splash from 'pages/Splash';
import { useEffect } from 'react';
import { useSelector } from 'store/hooks';
import {
  selectIsLoggedIn,
  selectSplashScreenShown,
} from 'store/profile/selectors';

const Login = () => {
  //TODO: save this on local storage so the splash is only seen once
  const userIsLogged = useSelector(selectIsLoggedIn);
  const splashScreenShown = useSelector(selectSplashScreenShown);
  const redirectAfterLogin = useRedirectAfterLogin();
  useEffect(() => {
    if (userIsLogged) {
      redirectAfterLogin();
    }
  }, [redirectAfterLogin, userIsLogged]);

  return splashScreenShown ? <RecoveryCodeScreen /> : <Splash />;
};

export default Login;
