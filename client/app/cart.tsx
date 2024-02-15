import { StatusBar, } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Import styles
import styles from '../styles/cart.styles'

export default function CartScreen() {
  const checkoutRoute = () => { router.replace("checkout" as any) }
  return (

    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Top container for displaying the icon */}
      <View style={styles.topContainer}>
      </View>

      {/* Bottom container for checkout button */}
      <View style={styles.botContainer}>
        {/* Register button */}
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