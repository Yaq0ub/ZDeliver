import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StyleSheet
} from "react-native";
import React, { useState } from "react";

import { loginUser } from "../services/firebase-AUTH/loginUser";
import { router } from "expo-router";


import { setAuthenticatedTrue } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

import Colors from "../constants/Colors";

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
      <StatusBar style={'light'}/>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
  
    },
    arrowContainer: {
      width: 40,
      height: 40,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      marginTop: 20,
    },
    headerText: {
      fontSize: 36,
      fontWeight: "bold",
    },
    infoContainer: {
      marginTop: 20,
    },
    fieldContainer: {
      marginTop: 20,
    },
    fieldText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    fieldInput: {
      marginTop: 10,
      width: "100%",
      height: 50,
      backgroundColor: Colors.light,
      borderWidth: 1,
      borderColor: Colors.light,
      borderRadius: 8,
      paddingLeft: 10,
    },
    forgotContainer: {
      marginTop: 20,
      alignItems: "flex-end",
    },
    forgotText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.primary,
    },
    button: {
      marginTop: 20,
      width: "100%",
      height: 50,
      backgroundColor: Colors.primary,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.white,
    },
    signupGroup: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    signup: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 5,
    },
    new: {
      fontSize: 16,
      fontWeight: "500",
      marginRight: 5,
    },
  });
