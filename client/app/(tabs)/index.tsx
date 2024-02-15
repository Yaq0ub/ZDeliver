
import React, { useState } from "react";
import { Button, StyleSheet,  View } from "react-native";

import FilterPicker from "../../components/filterPicker";
import ProductList from "../../components/ProductList";

import styles from '../../styles/home.styles'

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const FILTER_OPTIONS = ["All", "Popular", "Favorites", "One", "Two", "Three"];
 
  return (
    <View style={styles.container}>
      {/* Filter Picker Container */}
      <View style={styles.filterPickerContainer}>
        <FilterPicker 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter}
          filterOptions={FILTER_OPTIONS}/>
      </View>
      {/* Product List Container */}
      <View style={styles.productListContainer}>
        <ProductList selectedFilter={selectedFilter}/>
      </View>
    </View>
  );
}

