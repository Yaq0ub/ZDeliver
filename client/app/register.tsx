import {
  
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import React, { useState } from "react";
import { router } from 'expo-router';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// API
import { registerUser } from "../services/firebase-AUTH/registerUser";

//* Styles imports */
import styles from '../styles/register.styles'

/* State management imports */
import { setAuthenticatedTrue } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

export default function register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleSignup = async () => {
    setLoading(true);
    try {
      const success = await registerUser({ email, password, username, phone });
      if (success) {
        // Handle successful registration, e.g., navigate to a different screen
        Alert.alert("Registration Success", "Account created successfully 🎉");
        setLoading(false);
        dispatch(setAuthenticatedTrue());
        router.replace('/(tabs)');
      } else {
        // Handle registration failure (this might need adjustments based on your error handling)
        Alert.alert("Registration Failed", "Please try again.");
      }
    } catch (error) {
      // Error handling if `registerUser` throws
      console.error(error);
      Alert.alert("Error", "An error occurred during registration.");
    }
  };

  const navToLogin = () => {
    router.replace('/login')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.infoContainer}>
        {/* Username */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Username</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Enter your name"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Email</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Phone Number */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Phone Number</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Enter your phone number"
            value={phone?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        {/* Password */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Password</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="Enter your password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* Login Button */}
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupGroup}>
          <Text style={styles.new}>Already have an account?</Text>
          <TouchableOpacity onPress={navToLogin}>
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
    
  );
}