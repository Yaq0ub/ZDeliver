import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import React, { useState } from "react";

import { loginUser } from "../services/firebase-AUTH/loginUser";
import { router } from "expo-router";

// Import styles
import styles from '../styles/login.styles'

import { setAuthenticatedTrue } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const success = await loginUser({ email, password });
      if (success) {
        // Handle successful login, e.g., navigate to a different screen
        Alert.alert("Login Success", "Account Logged in successfully 🎉");
        setLoading(false);
        dispatch(setAuthenticatedTrue());
        router.replace('/(tabs)');
      } else {
        // Handle login failure (this might need adjustments based on your error handling)
        Alert.alert("Login Failed", "Please try again.");
      }
    } catch (error) {
      // Error handling if `loginUser` throws
      console.error(error);
      Alert.alert("Error", "An error occurred during login.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>

        <View style={styles.infoContainer}>

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
          {/* Forgot Password */}
          <View style={styles.forgotContainer}>
            <TouchableOpacity onPress={() => router.replace('/forgot')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.button}>

              <Text style={styles.buttonText}>
                Login
              </Text>

            </View>
          </TouchableOpacity>

          <View style={styles.signupGroup}>
            <Text style={styles.new}>New here?</Text>
            <TouchableOpacity onPress={() => router.replace("register" as any)}>
              <Text style={styles.signup}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}