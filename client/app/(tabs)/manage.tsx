import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
// Assuming expo-router is correctly set up in your project
// and router.push is the method you'd like to use for navigation
import { router } from 'expo-router';

import Colors from "../../constants/Colors";

export default function ManageAccount (){
  const handleChangePassword = () => {
    router.push("/(tabs)/");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.fullFlex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView style={styles.fullFlex} contentContainerStyle={styles.container}>
          <View style={styles.topContainer}>
            {/* Fields */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Name</Text>
              <TextInput style={styles.fieldInput} placeholder="Enter your name" />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Mobile#</Text>
              <TextInput style={styles.fieldInput} placeholder="Enter your mobile #" />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Email</Text>
              <TextInput style={styles.fieldInput} placeholder="Enter your email" />
            </View>

            <Text style={styles.sectionTitle}>Change Password</Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Old Password</Text>
              <TextInput secureTextEntry={true} style={styles.fieldInput} placeholder="Enter your password" />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>New Password</Text>
              <TextInput secureTextEntry={true} style={styles.fieldInput} placeholder="Enter your new password" />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Repeat New Password</Text>
              <TextInput secureTextEntry={true} style={styles.fieldInput} placeholder="Repeat new password" />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  topContainer: {
    // Removed fixed height
  },
  fieldContainer: {
    marginTop: 10,
  },
  fieldText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fieldInput: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: Colors.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
