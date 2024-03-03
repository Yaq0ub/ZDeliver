//import {useRef, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';

import { clearAddressesState } from '../features/account/addresses/addressesSlice';
import { clearPaymentsState } from '../features/account/payments/paymentsSlice';
import { clearOrdersState } from '../features/account/orders/ordersSlice';
import { clearAuthState } from '../features/auth/authSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useViewportUnits = () => {
  const {width, height} = useWindowDimensions();

  const vh = height / 100;
  const vw = width / 100;

  return {vh, vw};
};

export const clearAllStates = () => {
  const dispatch = useAppDispatch();
  dispatch(clearAddressesState())
  dispatch(clearPaymentsState())
  dispatch(clearOrdersState())
  dispatch(clearAuthState())
}
