// Redux Toolkit imports for creating thunks and slices, and defining action payloads
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import type for RootState from the central store configuration
import { RootState } from '../../../store';

// Import custom types for order
import { OrderType } from '../../../../constants/types';

import { addToUserOrders } from '../../../../services/firestore/addToUserOrders';


// Define the shape of the order-specific state
interface OrdersState {
    list: OrderType[]; 
}

// Initial state for the Orders slice
const initialState: OrdersState = {
    list: [],
};

/**
* Async thunk for adding an order to the user Orders.
* @param {OrderType} order to be removed.
*/
export const addToOrdersAsync = createAsyncThunk<
    void,
    OrderType,
    { state: RootState }>(
        'cart/addToOrdersAsync',
        async (order) => {
            await addToUserOrders(order);
        }
    );

// Slice definition for the payment module, including reducers and actions
export const ordersSlice = createSlice({
    name: 'Orders', // Unique name for the slice
    initialState, // Initial state for the payment module
    reducers: {
        // Reducer to update Orders state
        updateOrders: (state, action: PayloadAction<OrderType[]>) => {
            state.list = action.payload;
        },
        // Reducer to reset the payment state to its initial state
        clearOrdersState: () => {
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
    clearOrdersState,
    updateOrders,

} = ordersSlice.actions;

// The reducer is exported for inclusion in the store
export default ordersSlice.reducer;

