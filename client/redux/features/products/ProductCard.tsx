import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator,StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch } from '../../hooks';
import { addToCartAsync, removeFromCartAsync } from './productsSlice';
import { ProductItemType } from '../../../constants/types';
import { Ionicons } from '@expo/vector-icons';


import Shadows from '../../../constants/Shadows';
import Colors from '../../../constants/Colors'

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
      <View style={styles.rightContainer}>
        <View style={styles.counterContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={handleMinus} style={styles.counterButton}>
                {item.count === 1 ? (
                  <Ionicons name='trash' size={22} style={styles.iconColor} />
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
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row', // Align items horizontally
    margin: 10,
    //alignItems: 'center', // Vertically center the content in the row
    backgroundColor: Colors.light, // Background color for the item container
    borderRadius: 20, // Round the corners of the item container
    overflow: 'hidden', // Ensure child views are within the bounds of rounded corners
    ...Shadows.medium, // Apply medium shadow from your constants
    //padding: 10, // Add padding around the contents
    borderWidth: 0.1,
    borderColor: Colors.primary
  },
  leftContainer:{

  },
  rightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '30%',
    padding: 10,
    backgroundColor: Colors.light
  },
  image: {
    width: 100,
    height: 100,
    //borderRadius: 50, // Fully round the corners of the square image
    marginRight: 15, // Space between the image and the text content
  },
  textContainer: {
    flex: 1, // Fill available space
    justifyContent: 'center', // Center content vertically in the container
  },
  text: {
    textAlign: 'left', 
    marginBottom: 5, 
  },
  counterContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: Colors.grey, 
    borderRadius: 20, 
    ...Shadows.medium,
    borderWidth: 0.17,
    borderColor: Colors.primary,
    overflow: 'hidden'
  },
  counterButton: {
    padding: 2
  },
  counterCount: {
    fontSize: 16, // Increase font size for better readability
    marginHorizontal: "10%"
  },
  iconColor: {
    color: Colors.primary
  },
});

export default ProductCard;
