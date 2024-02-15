import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";

import { loginUser } from "../services/Auth/loginUser";
import { router } from "expo-router";

const { height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
  top = height * 0.02;
} else {
  top = 0;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const success = await loginUser({ email, password });
      if (success) {
        // Handle successful login, e.g., navigate to a different screen
        Alert.alert("Login Success", "Account Logged in successfully 🎉");
        setLoading(false);
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
      <View style={styles.container}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginHeaderText}>Login</Text>
        </View>

        <View style={styles.loginContainer}>
          {/* Email */}
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>Email</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {/* Password */}
          <View style={styles.passwordContainer}>
            <Text style={styles.passwordText}>Password</Text>
            <TextInput
              style={styles.passwordInput}
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
            <View style={styles.loginButton}>

              <Text style={styles.loginButtonText}>
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: height * 0.05,
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
  loginHeader: {
    marginTop: 20,
  },
  loginHeaderText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 20,
  },
  emailContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emailInput: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 8,
    paddingLeft: 10,
  },
  passwordContainer: {
    marginTop: 20,
  },
  passwordText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordInput: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderRadius: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: Colors.light,
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
  loginButton: {
    marginTop: 20,
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
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