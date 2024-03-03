import React, { useEffect } from "react";
import { View } from "react-native";
import ProductsFilter from "../../redux/features/products/ProductsFilter";
import ProductsList from "../../redux/features/products/ProductsList";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProductsAsync } from "../../redux/features/products/productsSlice";

import { setupCartListeners } from "../../services/firestore/setupCartListener";
import { setupAddressesListeners } from "../../services/firestore/setupAddressesListener";
import { setupPaymentsListeners } from "../../services/firestore/setupPaymentsListener";
import { router } from "expo-router";


import Colors from "../../constants/Colors";
export default function HomeScreen() {

  const dispatch = useAppDispatch();
  const userAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    if (userAuthenticated) {
      try {
        dispatch(getProductsAsync());
        setupCartListeners(dispatch);
        setupAddressesListeners(dispatch);
        setupPaymentsListeners(dispatch)
      } catch (error) {
        console.error("Failed to setup listeners", error);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style={'light'} />
      <View style={styles.filterPickerContainer}>
        <ProductsFilter />
      </View>
      <View style={styles.productListContainer}>
        <ProductsList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filterPickerContainer: {
      //height: '4%', // Make the filter picker occupy 5% of the screen
      width: '100%', // Ensure it spans the full width
      justifyContent: 'center', // Center the filters vertically within the picker
      marginVertical: 5,
      backgroundColor: Colors.light
    },
    productListContainer:{
      //height: '95%', // Make the filter picker occupy 5% of the screen
      width: '100%', // Ensure it spans the full width
      justifyContent: 'center', // Center the filters vertically within the picker
      //marginVertical: 10,
      flex: 1
    }
  });