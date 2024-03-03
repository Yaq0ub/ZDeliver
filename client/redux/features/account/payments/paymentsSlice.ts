// Redux Toolkit imports for creating thunks and slices, and defining action payloads
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import type for RootState from the central store configuration
import { RootState } from '../../../store';

// Import custom types for payment
import { PaymentType } from '../../../../constants/types';

import { removeFromUserPayments } from '../../../../services/firestore/removeFromUserPayments';
import { addToUserPayments } from '../../../../services/firestore/addToUserPayments';


// Define the shape of the payment-specific state
interface PaymentsState {
    list: PaymentType[]; 
}

// Initial state for the payments slice
const initialState: PaymentsState = {
    list: [],
};

/**
* Async thunk for adding an payment to the user payments.
* @param {PaymentType} payment to be removed.
*/
export const addToPaymentsAsync = createAsyncThunk<
    void,
    PaymentType,
    { state: RootState }>(
        'cart/addToPaymentsAsync',
        async (payment) => {
            await addToUserPayments(payment);
        }
    );
/**
 * Async thunk for removing a payment from the user payments.
 * @param {PaymentType} payment to be removed.
 */
export const removeFromPaymentsAsync = createAsyncThunk<
    void,
    PaymentType,
    { state: RootState }>(
        'cart/removeFromPaymentsAsync',
        async (payment) => {
            await removeFromUserPayments(payment);
        }
    );

// Slice definition for the payment module, including reducers and actions
export const paymentsSlice = createSlice({
    name: 'payments', // Unique name for the slice
    initialState, // Initial state for the payment module
    reducers: {
        // Reducer to update payments state
        updatePayments: (state, action: PayloadAction<PaymentType[]>) => {
            state.list = action.payload;
        },
        // Reducer to reset the payment state to its initial state
        clearPaymentsState: () => {
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
    clearPaymentsState,
    updatePayments,

} = paymentsSlice.actions;

// The reducer is exported for inclusion in the store
export default paymentsSlice.reducer;

