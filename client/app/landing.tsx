// Import necessary React Native components
import React, { useEffect } from 'react'; // Import React
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { router } from 'expo-router'; // Import router for navigation
import { StatusBar } from 'expo-status-bar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-async-storage/async-storage';
// Import styles
import styles from '../styles/landing.styles'
import { signOut, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { clearProductsState } from '../redux/features/products/productsSlice';

// LandingScreen component definition
export default function LandingScreen() {
  const loginRoute = () => router.push('/login');
  const registerRoute = () => router.push('/register');

  const dispatch = useDispatch();

  useEffect(() => {
    const clearStorage = async () => {
      try {
        signOut(getAuth())
        dispatch(clearProductsState())
        await AsyncStorage.clear();
        AsyncStorage.removeItem('persist:root')
        await storage.clear();
        console.log('Storage successfully cleared!');
      } catch (e) {
        console.log('Failed to clear the async storage.');
      }
    };

    clearStorage();
  }, []);
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
