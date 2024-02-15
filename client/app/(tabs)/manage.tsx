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
} from 'react-native';
// Assuming expo-router is correctly set up in your project
// and router.push is the method you'd like to use for navigation
import { router } from 'expo-router';
import styles from '../../styles/manage.styles'

// Mocked Colors object, replace with your actual Colors import
const Colors = {
  primary: 'skyblue',
  light: '#FFFFFF',
};



const ManageAccount = () => {
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

export default ManageAccount;