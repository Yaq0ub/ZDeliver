import { StatusBar, } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Import styles
import { StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Shadows from '../constants/Shadows';


import CartList from '../redux/features/products/CartList';


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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.light
    },
    topContainer: {
      width: '100%',
      height: '70%',
      //backgroundColor: '#000000',
      //alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
      //padding: 10,
      flex: 1
    },
    botContainer: {
      width: '100%',
      height: '30%',
      //backgroundColor: '#EEE00E',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: paddingVerticalPercentage,
    },
    title: {
      // Add title styles if needed
    },
    button: {
      width: 200,
      height: 50,
      backgroundColor: Colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadows.medium,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color:Colors.light,
    },
  });