// Firebase Firestore imports for database interaction
import { collection, getDocs } from "firebase/firestore";
// AsyncStorage for local storage, suitable for React Native applications
import AsyncStorage from "@react-native-async-storage/async-storage";
// Firebase configuration import, adjust the path based on your project structure
import { db } from "../../firebase/firebaseConfig";
// Type imports for strict type checking
import { ProductItemType } from "../../constants/types";

/**
 * Asynchronously fetches the product inventory from Firestore or local cache.
 * It caches the fetched products inventory along with the timestamp of the last fetch.
 * This approach helps in reducing database calls by using cached data when possible.
 * 
 * @returns A Promise resolving to an object containing arrays of categories and products.
 */
export const fetchProductsInventory = async (): Promise<{categoriesList: string[], productsList: ProductItemType[]}> => {
  // Current timestamp
  const currentTime = new Date().getTime();
  // Retrieve the last fetch time from AsyncStorage
  const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
  // Define one day in milliseconds for cache validity duration
  const oneDay = 24 * 60 * 60 * 1000; // 24 hours

  // Check if cached data is still valid (within one day)
  if (lastFetchTime && currentTime - parseInt(lastFetchTime) < oneDay) {
    // Attempt to retrieve cached product inventory
    const cachedData = await AsyncStorage.getItem('productsInventory');
    // If cached data exists, parse and return it
    if (cachedData) return JSON.parse(cachedData);
  }

  // Reference to the products inventory collection in Firestore
  const productsCollectionRef = collection(db, "ProductsInventory");

  try {
    // Fetch documents from the Firestore collection
    const querySnapshot = await getDocs(productsCollectionRef);
    // Initialize an empty array for products
    let productsList: ProductItemType[] = [];
    // Initialize a set for categories with a default category 'All'
    let categoriesSet: Set<string> = new Set(['All']);

    // Iterate over each document in the query snapshot
    querySnapshot.forEach((doc) => {
      // Construct product data from the document, defaulting count to 0
      const productData: ProductItemType = {
        ...doc.data() as Omit<ProductItemType, 'count'>, // Spread document data with type assertion
        count: 0 // Initialize count as 0
      };
      // Add product data to products list
      productsList.push(productData);
      // Add product category to categories set
      categoriesSet.add(productData.category);
    });

    // Convert categories set to array
    let categoriesList = Array.from(categoriesSet);

    // Prepare cache data
    const cacheData = { categoriesList, productsList };
    // Cache the inventory and last fetch timestamp in AsyncStorage
    await AsyncStorage.setItem('productsInventory', JSON.stringify(cacheData));
    await AsyncStorage.setItem('lastFetchTime', currentTime.toString());

    // Return the fetched and now cached data
    return cacheData;
  } catch (error) {
    // Log any errors encountered during the fetch operation
    console.error("Error reading documents: ", error);
    // Attempt to return cached data in case of an error
    const cachedData = await AsyncStorage.getItem('productsInventory');
    // Parse and return the cached data if available, else return empty arrays
    return cachedData ? JSON.parse(cachedData) : { categoriesList: [], productsList: [] };
  }
};
