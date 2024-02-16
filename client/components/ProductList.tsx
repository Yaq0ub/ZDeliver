import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';

import ProductCard from './productCard';
import ConvertInventoryToArray from '../utils/ConvertInventoryToArray';

// Import Styles
import styles from '../styles/components/ProductList.styles'

// Import types
import { ProductItemType, ProductListProps } from '../constants/types'

const ProductList: React.FC<ProductListProps> = ({ selectedFilter, productsInventory}) => {
  // State to hold the array of products
  const [products, setProducts] = useState<ProductItemType[]>([]);

  useEffect(() => {
    // Convert the object into an array suitable for FlatList
    let productArray: ProductItemType[] = ConvertInventoryToArray(productsInventory)

    // Filter products by category if selectedFilter is not 'All'
    if (selectedFilter !== 'All') {
      productArray = productArray.filter(product => product.category === selectedFilter);
    }

    setProducts(productArray);
  }, [ productsInventory, selectedFilter]); // Re-fetch or filter products when selectedFilter changes

  // Render function for each ProductCard
  const renderProduct = ({ item }: { item: ProductItemType }) => (
    <ProductCard name={item.name} price={item.price} uri={item.uri}/>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.key}
      style={styles.container}
    />
  );
};



export default ProductList;
