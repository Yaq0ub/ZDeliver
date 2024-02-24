
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { ProductItemType } from '../../../constants/types';
import { addToUserCart } from '../../../services/firebase/addToUserCart';
import { removeFromUserCart } from '../../../services/firebase/removeFromUserCart';
import { calculateUserCartSubtotal } from '../../../services/firebase/calculateUserCartSubtotal';
import { fetchProductsInventory } from '../../../services/firebase/fetchProductsInventory';

interface ProductsState {
  categories: string[];
  products: ProductItemType[];
  selectedCategory: string;
  cart: ProductItemType[]
  subtotal: number;
  fees: number;
}

const initialState: ProductsState = {
  categories: ['All'],
  products: [],
  selectedCategory: 'All',
  cart: [],
  subtotal: 0,
  fees: 0,
};

export const getProductsAsync = createAsyncThunk<any>(
  'products/fetchProducts',
  async (_,) => {
    try {
      const cacheData = await fetchProductsInventory();
      return cacheData;
    } catch (error) {
      console.error("Error fetching products inventory: ", error);
      // Return a default value or handle the error as appropriate for your app
      return { categoriesList: [], productsList: [] };
    }
  }
);

export const addToCartAsync = createAsyncThunk<void, ProductItemType, { state: RootState }>(
  'cart/addToCartAsync',
  async (item, { dispatch }) => {
    // Directly use writeToUserCart without passing userId
    await addToUserCart(item);

    // Call calculateSubtotalAsync to update subtotal after adding item
    dispatch(calculateSubtotalAsync());
  }
);

export const removeFromCartAsync = createAsyncThunk<void, ProductItemType, { state: RootState }>(
  'cart/removeFromCartAsync',
  async (item, { dispatch }) => {
    await removeFromUserCart(item);

    // Call calculateSubtotalAsync to update subtotal after removing item
    dispatch(calculateSubtotalAsync());
  }
);

export const calculateSubtotalAsync = createAsyncThunk<void, void, { state: RootState }>(
  'cart/calculateSubtotalAsync',
  async (_,) => {
    await calculateUserCartSubtotal();
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    // Updates the cart list with the new data
    updateCart: (state, action: PayloadAction<ProductItemType[]>) => {
      const updatedCart = action.payload;
      state.cart = updatedCart;
      // Directly modify the products array to update counts based on the cart
      state.products = state.products.map(product => {
        // Find the product in the updated cart
        const cartItem = updatedCart.find(cartItem => cartItem.id === product.id);
        
        // If the product is found in the cart, update its count, otherwise set to 0
        return {
          ...product,
          count: cartItem ? cartItem.count : 0,
        };
      });
    },
    updateSubtotal: (state, action: PayloadAction<number>) => {
      state.subtotal = action.payload;
    },
    clearProductsState: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      const { categoriesList, productsList } = action.payload;
      state.categories = categoriesList;
      state.products = productsList;
      state.products = state.products.map(product => {
        // Find the product in the updated cart
        const cartItem = state.cart.find(cartItem => cartItem.id === product.id);
        
        // If the product is found in the cart, update its count, otherwise set to 0
        return {
          ...product,
          count: cartItem ? cartItem.count : 0,
        };
      });
    });
  }

});

export const { 
  setSelectedCategory,
  updateCart,
  updateSubtotal, 
  clearProductsState } = productsSlice.actions;

//export const selectProductsList = (state: RootState) => state.products.list
export default productsSlice.reducer;