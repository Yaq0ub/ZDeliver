import { View, Text, Image } from 'react-native'
import React from 'react'
import Counter from '../../../components/Counter'

// Import style
import styles from '../../../styles/components/ProductCard.styles'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { addToCartAsync, removeFromCartAsync } from './productsSlice'
import { ProductItemType } from '../../../constants/types'

interface ProductCardProps {
  item: ProductItemType;
}
const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handlePlus = () => { dispatch(addToCartAsync(item)) };
  const handleMinus = () => { dispatch(removeFromCartAsync(item)) }
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
        <Counter
          count={item.count}
          plusHandler={handlePlus}
          minusHandler={handleMinus}
        />
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard