import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { loginByExplorerCodeThunk } from 'store/profile/actions.ts';

const Login = () => {
  const [explorerCode, setExplorerCode] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  async function doLogin() {
    await dispatch(loginByExplorerCodeThunk({ explorerCode, password }));
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
