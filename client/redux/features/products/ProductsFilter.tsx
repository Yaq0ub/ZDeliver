// FilterPicker.tsx
import React from "react";
import {ScrollView, TouchableOpacity, Text } from "react-native";
import styles from '../../../styles/components/ProductsFilter.styles'
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

export default ProductsFilter