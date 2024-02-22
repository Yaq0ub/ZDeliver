
import storage from '@react-native-async-storage/async-storage';
import { 
  //persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';

import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';

import productsReducer from './features/products/productsSlice';


/* For async persist */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Adding our rootReducer
const rootReducer = combineReducers({
  products: productsReducer
})

// Persisting our rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});


// export const store = configureStore({
//   reducer: {
//     products: productsReducer
//   }
// })
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;