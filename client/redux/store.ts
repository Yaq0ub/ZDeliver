// Import AsyncStorage for local storage in React Native applications.
import storage from '@react-native-async-storage/async-storage';
// Import utilities from redux-persist to enable state persistence and rehydration.
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Import utilities from Redux Toolkit for configuring the store, combining reducers, etc.
import {configureStore, ThunkAction, Action, combineReducers,} from '@reduxjs/toolkit';

// Import slices from the application's features to be used as reducers.
import productsReducer from './features/products/productsSlice';

import authReducer from './features/auth/authSlice';
import addressesReducer from './features/account/addresses/addressesSlice';
import paymentsReducer from './features/account/payments/paymentsSlice';
import ordersReducer from './features/account/orders/ordersSlice';
import checkoutReducer from './features/account/checkout/checkoutSlice'

/* Configuration object for redux-persist to define how the persistence will work */
const persistConfig = {
  key: 'root', // The key used for storing the persistence state in the storage
  storage, // The storage engine to use for persistence (AsyncStorage in this case)
};


/* Combining all feature reducers into a single root reducer */
const rootReducer = combineReducers({
  products: productsReducer,
  addresses: addressesReducer,
  payments: paymentsReducer,
  orders: ordersReducer,
  auth: authReducer,
  checkout: checkoutReducer,
});

/* Wrapping the root reducer with persistReducer to enable persistence */
const persistedReducer = persistReducer(persistConfig, rootReducer);


/* Configuring the Redux store with the persisted reducer and middleware */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configuration to ignore serialization checks for persistence actions
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* Creating a persistor for the store, which manages rehydration of the state */
export const persistor = persistStore(store);

/* Type definitions for use throughout the application */

// RootState: The type representing the overall state shape of the application
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch: The type representing the dispatch function of the store
export type AppDispatch = typeof store.dispatch;

// AppThunk: Generic type for Redux Thunks, enabling async logic that can interact with the store
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
