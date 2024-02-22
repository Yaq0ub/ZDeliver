import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

import { fetchProducts } from './productsAPI';
import { ProductItemType } from '../../../constants/types';

interface ProductsState {
  categories: string[];
  productsList: { [key: string]: ProductItemType };
  selectedCategory: string;
  cartList: { [key: string]: ProductItemType };
  cartCounts:{[key: string]: number};
  subTotal: number;
  fees: number;
}

const initialState: ProductsState = {
  categories: ['All'],
  productsList: {},
  selectedCategory: 'All',
  cartList: {},
  cartCounts: {},
  subTotal: 2.0,
  fees: 2.0
};

export const getProductsAsync = createAsyncThunk<any>(
  'products/fetchProducts',
  async () => {
    return await fetchProducts();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    addToCart: (state, action: PayloadAction<string>) => {
      // Get the productID from playload
      const productID = action.payload; 

      // Product exist in cart
      if (state.cartCounts[productID]) { 
        // Increase the count by 1
        state.cartCounts[productID] += 1;
        
      }
      // Not in cart
      else {
         // Add to cartList   
        state.cartList[productID] = state.productsList[productID];
        state.cartCounts[productID] = 1;
      }
      state.subTotal += state.productsList[productID].price
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Get the productID from playload
      const productID = action.payload;
      // Product exist in cart
      if (state.cartCounts[productID] > 1) {
        // Decrease the count by 1
        state.cartCounts[productID] -= 1;
        // Subtract from subtotal
        state.subTotal -= state.productsList[productID].price
      }
      // Last item
      else if(state.cartCounts[productID] == 1){
        // Remove from cart
        delete state.cartList[productID];
        // Set the count to 0
        state.cartCounts[productID] = 0;
        // Subtract from subtotal
        state.subTotal -= state.productsList[productID].price
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      const { categoriesString, productsDictionary } = action.payload;
      state.categories = categoriesString.split(',');
      state.productsList = productsDictionary;
      // state.subTotal = 0
      // Initialize cartCounts with zeros for each product
      Object.keys(productsDictionary).forEach(key => {
        if (state.cartCounts[key] === undefined) {
          state.cartCounts[key] = 0;
        }
        // If there is already a number, it remains unchanged
      });
    });
  }

});

export const {setSelectedCategory, addToCart, removeFromCart} = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProductsList = (state: RootState) => state.products.productsList
export default productsSlice.reducer;