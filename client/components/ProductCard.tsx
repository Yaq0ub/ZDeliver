import { View, Text, Image } from 'react-native'
import React from 'react'
import Counter from './Counter'

// Import style
import styles from '../styles/components/ProductCard.styles'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { addToCart, removeFromCart} from '../redux/features/products/productsSlice'

interface ProductCardProps {
  productID: string;
}
const ProductCard : React.FC<ProductCardProps> = ({productID}) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state)=>state.products.productsList[productID]);
  const count = useAppSelector((state)=>state.products.cartCounts[productID])
  const handlePlus = () => {dispatch(addToCart(productID))};
  const handleMinus = () => {dispatch(removeFromCart(productID))}
  return (
    <TouchableOpacity style={styles.itemContainer}>
    <Image source={{ uri: item.uri }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.text}>ID:{productID}</Text>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.category}</Text>
      <Text style={styles.text}>Price: ${item.price}</Text>
    </View>
    <View style={styles.counterContainer}>
      <Counter count={count} plusHandler={handlePlus} minusHandler={handleMinus}/>
    </View>
  </TouchableOpacity>
  )
}

export default ProductCard