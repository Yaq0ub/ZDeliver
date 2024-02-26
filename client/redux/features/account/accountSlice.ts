// Redux Toolkit imports for creating thunks and slices, and defining action payloads
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// Import type for RootState from the central store configuration
import { RootState } from '../../store';
// Import custom types for orders, payments, and addresses
import { OrderType, PaymentType, AddressType } from '../../../constants/types';
import { removeFromUserAddresses } from '../../../services/firestore/removeFromUserAddresses';

// Define the shape of the account-specific state
interface AccountState {
  orders: OrderType[];
  payments: PaymentType[];
  addresses: AddressType[];
}

// Initial state for the account slice, with empty arrays for orders, payments, and addresses
const initialState: AccountState = {
  orders: [],
  payments: [],
  addresses: [],
};

/**
 * Asynchronously fetches user settings or account-related data (stubbed function).
 * @returns A promise resolving to the fetched account settings.
 */
export const getSettingsAsync = createAsyncThunk<any>(
  'account/getSettings',
  async (_,) => {
    // Implementation would go here
  }
);

/**
 * Async thunk for removing an address from the user addresses.
 * @param {AddressType} addrress to be removed.
 */
export const removeFromAddressesAsync = createAsyncThunk<
  void,
  AddressType,
  { state: RootState }>(
    'cart/removeFromAddressesAsync',
    async (address) => {
      await removeFromUserAddresses(address);
    }
 );

// Slice definition for the account module, including reducers and actions
export const accountSlice = createSlice({
  name: 'account', // Unique name for the slice
  initialState, // Initial state for the account module
  reducers: {
    // Reducer to update addresses state
    updateAddresses: (state, action: PayloadAction<AddressType[]>)=>{
      state.addresses = action.payload;
    },
    // Reducer to update orders state
    updateOrders: (state, action: PayloadAction<OrderType[]>)=>{
      state.orders = action.payload;
    },
    // Reducer to update payments state
    updatePayments: (state, action: PayloadAction<PaymentType[]>)=>{
      state.payments = action.payload;
    },
    // Reducer to reset the account state to its initial state
    clearAccountState: () => {
      return initialState;
    },
  },
  // Extra reducers for handling asynchronous actions; left empty as an example
  extraReducers: (builder) => {
    // Asynchronous actions would be handled here
  }
});

// Action creators are generated for each case reducer function
export const {  
  clearAccountState,
  updateAddresses,
  updatePayments,
  updateOrders, 
} = accountSlice.actions;

// The reducer is exported for inclusion in the store
export default accountSlice.reducer;

// Selector example (commented out) to access account list from the state
//export const selectAccountList = (state: RootState) => state.account.list;
