import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../public/assets/fonts/fonts.css';
import './App.scss';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { refreshKeyPairThunk } from './store/profile/actions.ts';
import { backendApi, isThereProblemWithEncryption } from './api';
import NodeApiGateContextProvider from 'BrightID/components/NodeApiGate.tsx';
import { SubjectsListContextProvider } from 'contexts/SubjectsListContext.tsx';

backendApi.interceptors.response.use(
  (response) => response,
  (error) =>
    new Promise((_resolve, reject) => {
      if (isThereProblemWithEncryption(error.response?.data)) {
        store
          .dispatch(refreshKeyPairThunk())
          .then(() => {
            reject(new Error('retryRequest'));
          })
          .catch((_e) => {
            console.log(_e);
            reject(error);
          });
      } else {
        reject(error);
      }
    }),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SubjectsListContextProvider>
          <NodeApiGateContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </NodeApiGateContextProvider>
        </SubjectsListContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
