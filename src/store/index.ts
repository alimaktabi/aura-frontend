import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from 'BrightID/reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['recoveryData'], // won't be persisted
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducers,
    profile: profileSlice.reducer,
  }),
);

// Define the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'recoveryData/setRecoveryChannel',
          'recoveryData/init',
        ],
        ignoredPaths: ['recoveryData'],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type GetState = typeof store.getState;
export type RootState = ReturnType<GetState>;
