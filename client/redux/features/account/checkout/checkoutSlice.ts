// Redux Toolkit imports for creating thunks and slices, and defining action payloads
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import type for RootState from the central store configuration
import { RootState } from '../../../store';

// Import custom types for order
import { AddressType, PaymentType, ProductItemType } from '../../../../constants/types';

// Define the shape of the checkout-specific state
interface CheckoutState {
    items: ProductItemType[],
    address: AddressType | undefined,
    payment: PaymentType | undefined,
    method: string;
}

// Initial state for the checkout slice
const initialState: CheckoutState = {
    items: [],
    address: undefined,
    payment: undefined,
    method: 'pickup'
    
};

// Slice definition for the checkout module, including reducers and actions
export const checkoutSlice = createSlice({
    name: 'checkout', // Unique name for the slice
    initialState, // Initial state for the checkout module
    reducers: {
        updateAddress: (state, action: PayloadAction<AddressType>) => {
            state.address = action.payload;
        },
        updatePayment: (state, action: PayloadAction<PaymentType>) => {
            state.payment = action.payload;
        },
        updateMethod:(state, action: PayloadAction<string>) =>{
            state.method = action.payload;
        },
        clearCheckoutState: () => {
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
    clearCheckoutState,
    updateAddress,
    updatePayment,
    updateMethod
} = checkoutSlice.actions;

// The reducer is exported for inclusion in the store
export default checkoutSlice.reducer;

