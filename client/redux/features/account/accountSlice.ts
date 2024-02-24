
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { OrderType, PaymentType, AddressType } from '../../../constants/types';

interface AccountState {
  orders: OrderType[];
  payments: PaymentType[];
  addresses: AddressType[];
}

const initialState: AccountState = {
  orders: [],
  payments: [],
  addresses: [],
};


export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    
    clearAccountState: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    
  }

});

export const {  
  clearAccountState } = accountSlice.actions;

//export const selectaccountList = (state: RootState) => state.account.list
export default accountSlice.reducer;