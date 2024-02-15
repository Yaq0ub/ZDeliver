import { StatusBar, } from 'expo-status-bar';
import { 
  Platform, 
  StyleSheet,
  Button,
  Dimensions
   } from 'react-native';

import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import {router} from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Calculate dynamic padding based on screen height
const screenHeight = Dimensions.get('window').height;
const paddingVerticalPercentage = screenHeight * 0.03;

export default function CartScreen() {
  const checkoutRoute = () => {router.replace("checkout" as any)}
  return (
    
    <View style={styles.container}>
      <StatusBar style="dark"/>
      {/* Top container for displaying the icon */}
      <View style={styles.topContainer}>
      </View>

      {/* Bottom container for checkout button */}
      <View style={styles.botContainer}>
        {/* Register button */}
        <View style={styles.checkoutButton}>
          <TouchableOpacity onPress={checkoutRoute}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    width: '100%',
    height: '70%',
    //backgroundColor: '#000000',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  botContainer: {
    width: '100%',
    //backgroundColor: '#EEE00E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: paddingVerticalPercentage,
  },
  title: {
    // Add title styles if needed
  },
  checkoutButton: {
    width: '90%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:Colors.light,
  },
});