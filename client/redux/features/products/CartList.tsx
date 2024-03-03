import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

import { ProductItemType } from '../../../constants/types';

import { useAppSelector } from '../../hooks';

import Colors from "../../../constants/Colors"

const CartList: React.FC = () => {
    const cart = useAppSelector((state) => state.products.cart);
    useEffect(() => {

    }, [cart]); // `dispatch` is stable and doesn't change, so it's safe to include it here

    // Render function for each ProductCard
    const renderProduct = ({ item }: { item: ProductItemType }) => (
        <ProductCard item={item} />
    );

    return (
        <FlatList
            data={cart}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false} // Remove vertical scroll indicator
            showsHorizontalScrollIndicator={false} // Remove horizontal scroll indicator (if applicable)
            style={styles.container}
        />
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //height: "100%",
      backgroundColor: Colors.light
    }
  });
export default CartList;
