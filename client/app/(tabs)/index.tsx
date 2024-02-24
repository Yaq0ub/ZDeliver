import React, { useEffect } from "react";
import { View } from "react-native";
import ProductsFilter from "../../redux/features/products/ProductsFilter";
import ProductsList from "../../redux/features/products/ProductsList";
import styles from '../../styles/home.styles';
import { StatusBar } from "expo-status-bar";
import { useAppDispatch } from "../../redux/hooks";
import { getProductsAsync} from "../../redux/features/products/productsSlice";

import { setupCartAndSubtotalListeners } from "../../services/firebaseServices/setupCartAndSubtotalListeners";

export default function HomeScreen() {
  
  const dispatch = useAppDispatch();

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        dispatch(getProductsAsync());
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
    setupCartAndSubtotalListeners(dispatch);
  }, []);
  
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
