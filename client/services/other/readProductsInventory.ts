import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const readProductsInventory = async () => {
  const currentTime = new Date().getTime();
  const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day

  // Check if we need to fetch new data or use cached data
  if (lastFetchTime && currentTime - parseInt(lastFetchTime) < oneDay) {
    const cachedData = await AsyncStorage.getItem('productsInventory');
    if (cachedData) return JSON.parse(cachedData);
  }

  // Proceed with Firestore call if more than a day has passed or no cache exists
  const productsCollectionRef = collection(db, "ProductsInventory");
  try {
    const querySnapshot = await getDocs(productsCollectionRef);
    const productsDictionary: { [key: string]: { name: string; category: string; price: number; uri: string; } } = {};

    querySnapshot.forEach((doc) => {
      productsDictionary[doc.id] = doc.data() as { name: string; category: string; price: number; uri: string; };
    });

    // Update cache and last fetch timestamp
    await AsyncStorage.setItem('productsInventory', JSON.stringify(productsDictionary));
    await AsyncStorage.setItem('lastFetchTime', currentTime.toString());

    return productsDictionary;
  } catch (error) {
    console.error("Error reading documents: ", error);
    // Optionally, return cached data in case of an error
    const cachedData = await AsyncStorage.getItem('productsInventory');
    return cachedData ? JSON.parse(cachedData) : {};
  }
};

export default readProductsInventory;
