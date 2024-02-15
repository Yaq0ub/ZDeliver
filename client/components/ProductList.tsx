import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text } from 'react-native';

// Import Styles
import styles from '../styles/components/ProductList.styles'

// Define a type for the product items based on the structure returned by readProductsInventory
type ProductItemType = {
  key: string;
  name: string;
  price: number;
  category: string;
  uri: string;
};

// Add selectedFilter to the component props
interface ProductListProps {
  selectedFilter: string;
  productsInventory: any;
}

const ProductList: React.FC<ProductListProps> = ({ selectedFilter, productsInventory}) => {
  // State to hold the array of products
  const [products, setProducts] = useState<ProductItemType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Convert the object into an array suitable for FlatList
      let productArray: ProductItemType[] = Object.keys(productsInventory).map((key) => ({
        key,
        ...productsInventory[key],
      }));

      // Filter products by category if selectedFilter is not 'all'
      if (selectedFilter !== 'All') {
        productArray = productArray.filter(product => product.category === selectedFilter);
      }

      setProducts(productArray);
    };

    fetchProducts();
  }, [selectedFilter]); // Re-fetch or filter products when selectedFilter changes

  // Render function for each product
  const renderProduct = ({ item }: { item: ProductItemType }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>Price: ${item.price}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.key}
    />
  );
};



export default ProductList;
