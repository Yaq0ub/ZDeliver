// Import necessary React Native components
import React from 'react'; // Import React
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router'; // Import router for navigation

import Colors from '../constants/Colors'; // Import theme colors
import Shadows from '../constants/Shadows'; // Import Shadows
import { StatusBar } from 'expo-status-bar';


// Calculate dynamic padding based on screen height
const screenHeight = Dimensions.get('window').height;
const paddingVerticalPercentage = screenHeight * 0.03;

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
        <View style={styles.loginButton}>
          <TouchableOpacity onPress={loginRoute}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Register button */}
        <View style={styles.registerButton}>
          <TouchableOpacity onPress={registerRoute}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles definition using StyleSheet
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
  registerButton: {
    marginTop: 20,
    width: '90%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  loginButton: {
    width: '90%',
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
