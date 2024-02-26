import { StatusBar, } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Import styles
import styles from '../styles/cart.styles'

import CartList from '../redux/features/products/CartList';
import Subtotal from '../redux/features/products/Subtotal';

export default function CartScreen() {
  const checkoutRoute = () => { router.replace("checkout" as any) }
  return (

    <View style={styles.container}>
      
      <StatusBar style="light" />
      {/* Top container for displaying the cart */}
      <View style={styles.topContainer}>
          <CartList />
      </View>

      {/* Bottom container for checkout button */}
      <View style={styles.botContainer}>
        <Subtotal />
        {/* Checkout button */}
        <TouchableOpacity onPress={checkoutRoute}>
          <View style={styles.button}>

            <Text style={styles.buttonText}>Checkout</Text>

          </View>
        </TouchableOpacity>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={'light'} />
    </View>
  );
}