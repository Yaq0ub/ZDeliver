
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import ProductsFilter from "../../redux/features/products/ProductsFilter";
import ProductsList from "../../redux/features/products/ProductsList"

import styles from '../../styles/home.styles'

import { useAppDispatch} from "../../redux/hooks";

import { getProductsAsync} from "../../redux/features/products/productsSlice";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  
  const dispatch = useAppDispatch();

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        dispatch(getProductsAsync())
      } catch (error) {
        console.error("Failed to fetch products", error);
        // Handle the error appropriately
      }
    };

    fetchProducts();
  },[]);
  
  
  
  return (
    <View style={styles.container}>
      <StatusBar style={'light'}/>
      {/* Filter Picker Container */}
      <View style={styles.filterPickerContainer}>
        <ProductsFilter />
      </View>
      {/* Product List Container */}
      <View style={styles.productListContainer}>
        <ProductsList />
      </View>
    </View>
  );
}

