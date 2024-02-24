import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import ProductCard from './ProductCard';

// Import Styles
import styles from '../../../styles/components/ProductList.styles';

// Import types
import { ProductItemType } from '../../../constants/types';

import { useAppSelector } from '../../hooks';

const ProductsList: React.FC = () => {
  // Directly use the array of products from Redux state
  const productsInventory = useAppSelector((state) => state.products.products);
  const selectedCategory = useAppSelector((state) => state.products.selectedCategory);

  const [filteredProducts, setFilteredProducts] = useState<ProductItemType[]>([]);

  useEffect(() => {
    // Filter products by selected category if it's not 'All'
    const products = selectedCategory !== 'All'
      ? productsInventory.filter(product => product.category === selectedCategory)
      : productsInventory;

    setFilteredProducts(products);
  }, [productsInventory, selectedCategory]);

  // Render function for each ProductCard
  const renderProduct = ({ item }: { item: ProductItemType }) => (
    <ProductCard item={item} />
  );

  return (
    <FlatList
      data={filteredProducts}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

export default ProductsList;
