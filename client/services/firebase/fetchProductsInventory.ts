import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebase/firebaseConfig"; // Adjust the path as necessary
import { ProductItemType } from "../../constants/types"; // Adjust the path as necessary to your types

/**
 * Fetches products inventory from Firestore or cache.
 * Caches the products inventory and the last fetch time.
 * Returns the products inventory including categories and products list.
 */
export const fetchProductsInventory = async (): Promise<{categoriesList: string[], productsList: ProductItemType[]}> => {
  const currentTime = new Date().getTime();
  const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
  const oneDay = 24 * 60 * 60 * 1000;

  if (lastFetchTime && currentTime - parseInt(lastFetchTime) < oneDay) {
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
        ...doc.data() as Omit<ProductItemType, 'count'>,
        count: 0
      };
      productsList.push(productData);
      categoriesSet.add(productData.category);
    });

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
};
