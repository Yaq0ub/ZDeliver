import React, { useEffect, useState } from 'react';
import {FlatList} from 'react-native';

import ProductCard from '../../../components/ProductCard';

// Import Styles
import styles from '../../../styles/components/ProductList.styles'

// Import types
import { ProductItemType} from '../../../constants/types'

import {useAppSelector } from '../../hooks';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductItemType[]>()

  // State to hold the array of products
  const productsInventory= useAppSelector((state)=> state.products.productsList);
  const selectedCategory = useAppSelector((state)=> state.products.selectedCategory);
  
  useEffect(() => {
    // Inline conversion of the object into an array suitable for FlatList
    const productsArray = Object.keys(productsInventory).map(key => ({
      ...productsInventory[key],
      key, // Assuming each product doesn't already include a 'key' property
    }));
   
    // Filter products by selected category if it's not 'All'
    const filteredProducts = selectedCategory !== 'All'
      ? productsArray.filter(product => product.category === selectedCategory)
      : productsArray;
  
    setProducts(filteredProducts);
  }, [productsInventory, selectedCategory]);

  // Render function for each ProductCard
  const renderProduct = ({ item }: { item: ProductItemType }) => (
    <ProductCard productID={item.key}/>
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



export default ProductsList;
