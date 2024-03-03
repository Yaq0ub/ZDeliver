// Import necessary React Native components
import React, { useEffect } from 'react'; // Import React
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router'; // Import router for navigation
import { StatusBar } from 'expo-status-bar';

// Import styles
import {StyleSheet} from 'react-native'
import Colors from '../constants/Colors'; // Import theme colors
import Shadows from '../constants/Shadows'; // Import Shadows


// LandingScreen component definition
export default function LandingScreen() {
  
  const loginRoute = () => router.push('/login');
  const registerRoute = () => router.push('/register');
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
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
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
      backgroundColor: Colors.light
    },
    botContainer: {
      width: '100%',
      //backgroundColor: '#EEE00E',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.light
    },
    title: {
      // Add title styles if needed
    },
    button: {
      marginTop: 20,
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
    iconContainer: {
      ...Shadows.medium,
      borderRadius: 25,
      //width:"50%",
      //height:"50%",
      //overflow:'hidden'
      backgroundColor: Colors.primary
    },
    icon: {
      width: 300, // Set the width of the icon
      height: 300, // Set the height of the icon
      // Ensure the icon itself does not cut off any applied shadows
      borderRadius: 25,
      borderWidth: 5,
      borderColor: Colors.primary
      
    },
  });