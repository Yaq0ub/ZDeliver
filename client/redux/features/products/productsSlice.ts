// Imports from Redux Toolkit and local files for functionality and type definitions
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ProductItemType } from '../../../constants/types';

// Importing CRUD operations from services
import { addToUserCart } from '../../../services/firestore/addToUserCart';
import { removeFromUserCart } from '../../../services/firestore/removeFromUserCart';
import { fetchProductsInventory } from '../../../services/firestore/fetchProductsInventory';

/**
 * Type definition for the state managed by this slice.
 */
interface ProductsState {
  categories: string[];
  products: ProductItemType[];
  selectedCategory: string;
  cart: ProductItemType[];
  subtotal: number;
  fees: number;
}

// The initial state for the products slice, setting up default values.
const initialState: ProductsState = {
  categories: ['All'],
  products: [],
  selectedCategory: 'All',
  cart: [],
  subtotal: 0,
  fees: 0,
};

/**
 * Async thunk for fetching products from the inventory.
 * @returns {Promise<any>} The fetched products and categories.
 */
export const getProductsAsync = createAsyncThunk<any>(
  'products/fetchProducts',
  async () => {
    try {
      const cacheData = await fetchProductsInventory();
      return cacheData;
    } catch (error) {
      console.error("Error fetching products inventory: ", error);
      return { categoriesList: [], productsList: [] };
    }
  }
);

/**
 * Async thunk for adding an item to the user's cart.
 * @param {ProductItemType} item The item to be added to the cart.
 * @param {RootState} state The current state of the Redux store.
 */
export const addToCartAsync = createAsyncThunk<
  void,
  ProductItemType,
  { state: RootState }>(
    'cart/addToCartAsync',
    async (item) => {
      await addToUserCart(item);
    }
  );

/**
 * Async thunk for removing an item from the user's cart.
 * @param {ProductItemType} item The item to be removed from the cart.
 */
export const removeFromCartAsync = createAsyncThunk<
  void,
  ProductItemType,
  { state: RootState }>(
    'cart/removeFromCartAsync',
    async (item) => {
      await removeFromUserCart(item);
    }
  );

// The slice for products, containing reducers and extra reducers for handling async operations.
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Sets the selected category in the state.
     * @param {PayloadAction<string>} action The action payload containing the category.
     */
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    /**
     * Updates the cart with new data and recalculates product counts.
     * @param {PayloadAction<ProductItemType[]>} action The action payload containing the new cart data.
     */
    updateCart: (state, action: PayloadAction<ProductItemType[]>) => {
      const updatedCart = action.payload;
      state.cart = updatedCart;
      state.products.forEach((product) => {
        const cartItem = updatedCart.find((item) => item.id === product.id);
        product.count = cartItem ? cartItem.count : 0;
      });
      // CalculateSubtotal
      state.subtotal = state.cart.reduce((subtotal, item) => subtotal + (item.price * item.count), 0);
    },
    /**
     * Resets the products state to its initial values.
     */
    clearProductsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      const { categoriesList, productsList } = action.payload;
      state.categories = categoriesList;
      state.products = productsList;
      state.products.forEach((product) => {
        const cartItem = state.cart.find((item) => item.id === product.id);
        product.count = cartItem ? cartItem.count : 0;
      });
      
    });
  },
});

// Exporting the slice's actions and the reducer itself.
export const { setSelectedCategory, updateCart, clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;
