
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../../../firebase/firebaseConfig";
import { updateDoc, getDoc, getDocs, doc, setDoc, deleteDoc, collection  } from 'firebase/firestore';
import { ProductItemType } from '../../../constants/types';

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
  async (_, { getState }) => {
    const currentTime = new Date().getTime();
    const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
    const oneDay = 24 * 60 * 60 * 1000;
  
    if (lastFetchTime && currentTime - parseInt(lastFetchTime) < oneDay ) {
      const cachedData = await AsyncStorage.getItem('productsInventory');
      if (cachedData) return JSON.parse(cachedData);
    }

    const productsCollectionRef = collection(db, "ProductsInventory");
    try {
      const querySnapshot = await getDocs(productsCollectionRef);
      let productsList: ProductItemType[] = [];
      let categoriesSet: Set<string> = new Set(['All']);

      querySnapshot.forEach((doc) => {
        const productData: ProductItemType = {
          ...doc.data() as Omit<ProductItemType,'count'>,
          count: 0
        };
        //console.log(productData)
        productsList.push(productData);
        categoriesSet.add(productData.category);
      });
      // Convert the Set to an array for storing in the Redux state
      let categoriesList = Array.from(categoriesSet);
      
      const cacheData = { categoriesList, productsList };
      await AsyncStorage.setItem('productsInventory', JSON.stringify(cacheData));
      await AsyncStorage.setItem('lastFetchTime', currentTime.toString());

      return cacheData;
    } catch (error) {
      console.error("Error reading documents: ", error);
      const cachedData = await AsyncStorage.getItem('productsInventory');
      return cachedData ? JSON.parse(cachedData) : { categoriesList: [], productsList: [] };
    }
  }
);

export const addToCartAsync = createAsyncThunk<void, ProductItemType, { state: RootState }>(
  'cart/addToCartAsync',
  async (item, { getState, dispatch }) => {
    // Correctly reference the 'cart' collection within the 'testuserid' document
    const userDocRef = doc(db, 'Users', 'testuserid'); // Reference to the user document
    const cartCollectionRef = collection(userDocRef, 'cart'); // Correctly reference the 'cart' collection
    const itemDocRef = doc(cartCollectionRef, item.id); // Construct a reference to the item document using `item.key`
    const docSnap = await getDoc(itemDocRef); // Check if the item document exists
    if (docSnap.exists()) {
      // Item exists, increment its 'count' field
      await updateDoc(itemDocRef, {
        count: docSnap.data().count + 1
      });
    } else {
      // Directly including `count: 1` in the object to ensure it's set
      const docData = {
        ...item,
        count: 1 // Explicitly set count here for new items
      };
      //console.log(item)
      await setDoc(itemDocRef, docData);
    }
    // Call calculateSubtotalAsync to update subtotal after adding item
    dispatch(calculateSubtotalAsync());
  }
  
);

export const removeFromCartAsync = createAsyncThunk<void, ProductItemType, { state: RootState }>(
  'cart/removeFromCartAsync',
  async (item, { getState, dispatch }) => {
    const userDocRef = doc(db, 'Users', 'testuserid'); // Reference to the user document
    const cartCollectionRef = collection(userDocRef, 'cart'); // Correctly reference the 'cart' collection
    const itemDocRef = doc(cartCollectionRef, item.id); // Construct a reference to the item document using `item.key`

    // Check if the document exists (item is in cart)
    const docSnap = await getDoc(itemDocRef);
    if (docSnap.exists()) {
      const currentCount = docSnap.data().count;
      if (currentCount > 1) {
        // If more than one, decrement its count field
        await updateDoc(itemDocRef, {
          count: currentCount - 1
        });
      } else {
        // If count is 1, remove the document entirely
        await deleteDoc(itemDocRef);
      }
    } else {
      // Optionally handle the case where the item is not found in the cart
      console.log('Item not found in the cart');
    }
    dispatch(calculateSubtotalAsync());
  }
);

export const calculateSubtotalAsync = createAsyncThunk<void, void, { state: RootState }>(
  'cart/calculateSubtotalAsync',
  async (_, { getState, dispatch }) => {
    console.log("hello")
    const userDocRef = doc(db, 'Users', 'testuserid'); // Reference to the user document
    const cartCollectionRef = collection(userDocRef, 'cart'); // Correctly reference the 'cart' collection
    const snapshot = await getDocs(cartCollectionRef);
    let subtotal = 0;
    
    snapshot.forEach(doc => {
      if (doc.id !== '0') { // Skip document 0 since it's used for storing subtotal
        const data = doc.data();
        const price = data.price || 0;
        const count = data.count || 0;
        subtotal += price * count;
        //console.log(subtotal)
      }
    });

    // Update the subtotal in document 0
    const subtotalDocRef = doc(cartCollectionRef, '0'); // Reference to the subtotal document
    await updateDoc(subtotalDocRef, { subtotal });

    // Optionally dispatch an action to update the subtotal in the local state
    console.log(subtotal)
    dispatch(updateSubtotal(subtotal));
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