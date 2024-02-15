
import React, { useState } from "react";
import { Button, StyleSheet,  View } from "react-native";

import FilterPicker from "../../components/filterPicker";
import ProductList from "../../components/ProductList";

export default function TabOneScreen() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterPickerContainer: {
    height: '5%', // Make the filter picker occupy 5% of the screen
    width: '100%', // Ensure it spans the full width
    justifyContent: 'center', // Center the filters vertically within the picker
    marginVertical: 5
  },
  productListContainer:{
    //height: '95%', // Make the filter picker occupy 5% of the screen
    width: '100%', // Ensure it spans the full width
    justifyContent: 'center', // Center the filters vertically within the picker
    //marginVertical: 10
  }
});
