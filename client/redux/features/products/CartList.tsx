import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import ProductCard from '../../../components/ProductCard';

// Import Styles
import styles from '../../../styles/components/ProductList.styles'

// Import types
import { ProductItemType } from '../../../constants/types'

import { useAppSelector } from '../../hooks';

const CartList: React.FC = () => {

    // State to hold the array of products
    const cartList = useAppSelector((state) => state.products.cartList);

    const [cartItemsArray, setCartItemsArray] = useState<any>()

    useEffect(() => {
        // Convert the object into an array suitable for FlatList

        const cartArray = Object.keys(cartList).map(key => ({
            ...cartList[key],
            key, // Assuming each product doesn't already include a 'key' property
          }));
          
        setCartItemsArray(cartArray)
    }, [cartList]); // Re-fetch or filter products when selectedFilter changes

    // Render function for each ProductCard
    const renderProduct = ({ item }: { item: ProductItemType }) => (
        <ProductCard productID={item.key}/>
    );

    return (
        <FlatList
            data={cartItemsArray}
            renderItem={renderProduct}
            keyExtractor={(item) => item.key}
            style={styles.container}
        />
    );
};



export default CartList;
