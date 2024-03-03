// Redux Toolkit imports for creating thunks and slices, and defining action payloads
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// Import type for RootState from the central store configuration
import { RootState } from '../../../store';
// Import custom types for orders, payments, and addresses
import {  AddressType } from '../../../../constants/types';

import { removeFromUserAddresses } from '../../../../services/firestore/removeFromUserAddresses';
import { addToUserAddresses } from '../../../../services/firestore/addToUserAddresses';


// Define the shape of the address-specific state
interface AddressesState {
  list: AddressType[];
}

// Initial state for the address slice, with empty arrays for addresses
const initialState: AddressesState = {
  list: [],
};

 /**
 * Async thunk for adding an address to the user addresses.
 * @param {AddressType} addrress to be removed.
 */
 export const addToAddressesAsync = createAsyncThunk<
 void,
 AddressType,
 { state: RootState }>(
   'cart/addToddressesAsync',
   async (address) => {
     await addToUserAddresses(address);
   }
 );
/**
 * Async thunk for removing an address from the user addresses.
 * @param {AddressType} address to be removed.
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

// Slice definition for the address module, including reducers and actions
export const addressesSlice = createSlice({
  name: 'addresses', // Unique name for the slice
  initialState, // Initial state for the address module
  reducers: {
    // Reducer to update addresses state
    updateAddresses: (state, action: PayloadAction<AddressType[]>)=>{
      state.list = action.payload;
    },
    // Reducer to reset the address state to its initial state
    clearAddressesState: () => {
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
  clearAddressesState,
  updateAddresses,

} = addressesSlice.actions;

// The reducer is exported for inclusion in the store
export default addressesSlice.reducer;

