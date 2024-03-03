// FilterPicker.tsx
import React from "react";
import {ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../../../constants/Colors";

import {useAppSelector, useAppDispatch } from '../../hooks';

import { 
    setSelectedCategory
 } from "./productsSlice"; 

const ProductsFilter: React.FC = () => {
  const selectedCategory = useAppSelector((state)=> state.products.selectedCategory)
  const categories = useAppSelector((state) => state.products.categories)
  const dispatch = useAppDispatch();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {categories.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.filterField,
            filter === selectedCategory && styles.selected,
          ]}
          onPress={() => dispatch(setSelectedCategory(filter))}
        >
          <Text style={styles.filterText}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    filterContainer: {
      flexDirection: "row",
      alignItems: 'center',
      margin: 4,
      backgroundColor: Colors.light  
    },
    filterField: {
      backgroundColor: Colors.grey,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 4,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    selected: {
      backgroundColor: Colors.lightBlue,
    },
    filterText: {
      color: "#000",
      fontSize: 12
    },
  });
export default ProductsFilter