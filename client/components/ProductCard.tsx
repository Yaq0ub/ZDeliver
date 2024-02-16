import { View, Text, Image } from 'react-native'
import React from 'react'

// Import style
import styles from '../styles/components/ProductCard.styles'

// Import types
import { ProductCardType } from '../constants/types'

const ProductCard : React.FC<ProductCardType> = ({name, price, uri}) => {
  return (
    <View style={styles.itemContainer}>
    <Image source={{ uri: uri }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>Price: ${price}</Text>
    </View>
  </View>
  )
}

export default ProductCard