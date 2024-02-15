import { View, Text, } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Import styles
import styles from '../styles/checkout.styles'

const checkout = () => {
  const placedRoute = () => {
    router.replace('placed' as any)
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Top container for displaying the icon */}
      <View style={styles.topContainer}>
      </View>

      {/* Bottom container for checkout button */}
      <View style={styles.botContainer}>
        {/* Register button */}

        <TouchableOpacity onPress={placedRoute}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Place order</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default checkout