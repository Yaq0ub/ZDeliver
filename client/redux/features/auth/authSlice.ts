
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { OrderType, PaymentType, AddressType } from '../../../constants/types';

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedFalse:(state) =>{
      state.isAuthenticated = false;
    },
    setAuthenticatedTrue: (state) =>{
      state.isAuthenticated = true;
    },
    clearAuthState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    
  }

});

export const {  
  clearAuthState,
  setAuthenticatedFalse,
  setAuthenticatedTrue } = authSlice.actions;

//export const selectAuthList = (state: RootState) => state.auth.isAuthenticated
export default authSlice.reducer;