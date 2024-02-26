import React, { useEffect } from "react";
import { View } from "react-native";
import ProductsFilter from "../../redux/features/products/ProductsFilter";
import ProductsList from "../../redux/features/products/ProductsList";
import styles from '../../styles/home.styles';
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProductsAsync} from "../../redux/features/products/productsSlice";

import { setupCartListeners } from "../../services/firestore/setupCartListener";
import { setupAddressesListeners } from "../../services/firestore/setupAddressesListener";

export default function HomeScreen() {
  
  const dispatch = useAppDispatch();
  const userAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  useEffect(() => { 
    if (userAuthenticated) {
      const fetchProducts = async () => {
        try {
          dispatch(getProductsAsync());
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };

      fetchProducts();
      setupCartListeners(dispatch);
      setupAddressesListeners(dispatch)
    }
  }, [userAuthenticated]); 
  
  return (
    <View style={styles.container}>
      <StatusBar style={'light'}/>
      <View style={styles.filterPickerContainer}>
        <ProductsFilter />
      </View>
      <View style={styles.productListContainer}>
        <ProductsList />
      </View>
    </View>
  );
}
