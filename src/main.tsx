import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../public/assets/fonts/fonts.css';
import './App.scss';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
