import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from 'store';
import { loginByExplorerCodeThunk } from 'store/profile/actions';
import { RoutePath } from 'types/router';

import { selectIsLoggedIn } from '../../store/profile/selectors';
import { decryptData } from '../../utils/crypto';

const Login = () => {
  const [explorerCode, setExplorerCode] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [query] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectAfterLogin = useCallback(() => {
    if (location.pathname === RoutePath.LOGIN) {
      const next = query.get('next');
      navigate(next ?? RoutePath.DASHBOARD, { replace: true });
    }
  }, [location.pathname, navigate, query]);

  const userIsLogged = useSelector(selectIsLoggedIn); // Your hook to get login status
  useEffect(() => {
    if (userIsLogged) {
      redirectAfterLogin();
    }
  }, [redirectAfterLogin, userIsLogged]);

  async function doLogin() {
    try {
      const brightId = decryptData(explorerCode, password);
      if (!brightId) {
        alert('Incorrect explorer code or password');
        return;
      }
    } catch (e) {
      alert('Incorrect explorer code or password');
      return;
    }
    try {
      await dispatch(loginByExplorerCodeThunk({ explorerCode, password }));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="page page__dashboard">
      <div className="row mb-4">
        <input
          className="w-full bg-gray30 text-black2 font-medium placeholder-black2 text-sm h-11 focus:outline-none px-4"
          type="text"
          value={explorerCode}
          onInput={(e) => setExplorerCode(e.currentTarget.value)}
          placeholder="Explorer code"
        />
      </div>
      <div className="row mb-4">
        <input
          className="w-full bg-gray30 text-black2 font-medium placeholder-black2 text-sm h-11 focus:outline-none px-4"
          type="password"
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
        />
      </div>
      <button className="btn" onClick={doLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
