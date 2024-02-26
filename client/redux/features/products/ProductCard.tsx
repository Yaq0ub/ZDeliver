import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

import styles from '../../../styles/components/ProductCard.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch } from '../../hooks';
import { addToCartAsync, removeFromCartAsync } from './productsSlice';
import { ProductItemType } from '../../../constants/types';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
interface ProductCardProps {
  item: ProductItemType;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlus = async () => {
    setIsLoading(true);
    await dispatch(addToCartAsync(item));
    setIsLoading(false);
  };

  const handleMinus = async () => {
    setIsLoading(true);
    await dispatch(removeFromCartAsync(item));
    setIsLoading(false);
  };

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>ID:{item.id}</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.category}</Text>
        <Text style={styles.text}>Price: ${item.price}</Text>
      </View>
      <View style={styles.counterContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={handleMinus} style={styles.counterButton}>
              {item.count === 1 ? (
                <Ionicons name='trash' size={24} style={styles.iconColor} />
              ) : (
                <Ionicons name='remove-circle' size={24} color={Colors.primary} />
              )}
            </TouchableOpacity>
            <Text style={styles.counterCount}>{item.count}</Text>
            <TouchableOpacity onPress={handlePlus} style={styles.counterButton}>
              <Ionicons name='add-circle' size={24} style={styles.iconColor} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
