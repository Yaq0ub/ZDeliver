import { View, Text, } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Import styles
import { StyleSheet} from 'react-native'
import Colors from '../constants/Colors'
import Shadows from '../constants/Shadows';
import CheckoutOptionsSelector from '../redux/features/account/checkout/CheckoutOptionsSelector'

export default function Checkout(){
  const placedRoute = () => {
    router.replace('placed' as any)
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Top container for displaying the icon */}
      <View style={styles.topContainer}>
        <CheckoutOptionsSelector/>
      </View>

      {/* Bottom container for place order button */}
      <View style={styles.botContainer}>

        <TouchableOpacity onPress={placedRoute}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Place order</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
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
        padding: 5,
        justifyContent:'flex-start', // Center vertically
        flex: 1
      },
      botContainer: {
        width: '100%',
        height: '20%',
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
        ...Shadows.medium
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light,
    },
});
