import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const readProductsInventory = async () => {
  const currentTime = new Date().getTime();
  const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
  const checkCache = true;

  // Check if we need to fetch new data or use cached data
  if (lastFetchTime && currentTime - parseInt(lastFetchTime) < oneDay && checkCache) {
    const cachedData = await AsyncStorage.getItem('productsInventory');
    if (cachedData) return JSON.parse(cachedData);
  }

  // Proceed with Firestore call if more than a day has passed or no cache exists
  const productsCollectionRef = collection(db, "ProductsInventory");
  try {
    const querySnapshot = await getDocs(productsCollectionRef);
    const productsDictionary: { [key: string]: { name: string; category: string; price: number; uri: string;} } = {};
    const categoriesSet: Set<string> = new Set(); // To store unique categories

    // Add all categories for the set
    categoriesSet.add('All')
    
    querySnapshot.forEach((doc) => {
      const productData = doc.data() as { name: string; category: string; price: number; uri: string; };
      productsDictionary[doc.id] = productData;
      categoriesSet.add(productData.category); // Add category to the set
    });

    

    // Convert set of categories to a comma-separated string
    const categoriesString = Array.from(categoriesSet).join(',');
    // Update cache and last fetch timestamp
    // Combine both categoriesString and productsDictionary for caching
    const cacheData = { categoriesString, productsDictionary };
    await AsyncStorage.setItem('productsInventory', JSON.stringify(cacheData));
    await AsyncStorage.setItem('lastFetchTime', currentTime.toString());

    console.log(cacheData)
    return cacheData; // Now returns an object with both categories and products
  } catch (error) {
    console.error("Error reading documents: ", error);
    // Optionally, return cached data in case of an error
    const cachedData = await AsyncStorage.getItem('productsInventory');
    return cachedData ? JSON.parse(cachedData) : { categoriesString: '', productsDictionary: {} };
  }
};

export default readProductsInventory;
