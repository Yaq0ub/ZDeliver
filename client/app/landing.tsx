// Import necessary React Native components
import React from 'react'; // Import React
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { router } from 'expo-router'; // Import router for navigation
import { StatusBar } from 'expo-status-bar';

// Import styles
import styles from '../styles/landing.styles'

// LandingScreen component definition
export default function LandingScreen() {
  // Function to navigate to the login screen
  const loginRoute = () => router.push('/login');

  // Function to navigate to the registration screen
  const registerRoute = () => router.push('/register');

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      {/* Top container for displaying the icon */}
      <View style={styles.topContainer}>
        {/* Icon container with platform-specific shadow/elevation */}
        <View style={styles.iconContainer}>
          <Image source={require('../assets/images/icon2.png')} style={styles.icon} />
        </View>
      </View>

      {/* Bottom container for login and registration buttons */}
      <View style={styles.botContainer}>
        {/* Login button */}
        <TouchableOpacity onPress={loginRoute}>
        <View style={styles.button}>
          
            <Text style={styles.buttonText}>Login</Text>
          
        </View>
        </TouchableOpacity>

        {/* Register button */}
        <TouchableOpacity onPress={registerRoute}>
        <View style={styles.button}>
          
            <Text style={styles.buttonText}>Register</Text>
          
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
