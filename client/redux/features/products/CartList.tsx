import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import ProductCard from './ProductCard';
import styles from '../../../styles/components/ProductList.styles';

import { ProductItemType } from '../../../constants/types';

import { useAppSelector } from '../../hooks';

const CartList: React.FC = () => {
    const cartList = useAppSelector((state) => state.products.cart);
    useEffect(() => {
       
    }, [cartList]); // `dispatch` is stable and doesn't change, so it's safe to include it here

    // Render function for each ProductCard
    const renderProduct = ({ item }: { item: ProductItemType }) => (
        <ProductCard item={item} />
    );

    return (
        <FlatList
            data={cartList}
            renderItem={renderProduct}
            keyExtractor={(item, index) => item.id || String(index)}
            style={styles.container}
        />
    );
};

export default CartList;
