
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import FilterPicker from "../../components/filterPicker";
import ProductList from "../../components/ProductList";

import styles from '../../styles/home.styles'
import readProductsInventory from "../../services/other/readProductsInventory";

// Import types
import { ProductItemType } from "../../constants/types";

export default function HomeScreen() {
  const [products, setProducts] =  useState<ProductItemType[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['']) 

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        const productsInventory = await readProductsInventory();
        setCategories(productsInventory.categoriesString.split(','));
        setProducts(productsInventory.productsDictionary);
      } catch (error) {
        console.error("Failed to fetch products", error);
        // Handle the error appropriately
      }
    };

    fetchProducts();
  },[]);
  
  
  
  return (
    <View style={styles.container}>
      {/* Filter Picker Container */}
      <View style={styles.filterPickerContainer}>
        <FilterPicker 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter}
          filterOptions={categories}
        />
      </View>
      {/* Product List Container */}
      <View style={styles.productListContainer}>
        <ProductList 
          selectedFilter={selectedFilter} 
          productsInventory={products}
        />
      </View>
    </View>
  );
}

