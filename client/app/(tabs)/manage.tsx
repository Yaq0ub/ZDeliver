import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform, // Import Platform to differentiate behavior between iOS and Android
} from 'react-native';

// Assuming your styles are defined in '../../styles/manage.styles'
// and router setup is correct with 'expo-router'
import { router } from 'expo-router';
import styles from '../../styles/manage.styles';

const ManageAccount = () => {
  const handleChangePassword = () => {
    router.push("/(tabs)/");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on the platform
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Name</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Mobile#</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Enter your mobile #"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Email</Text>
              <TextInput
                style={styles.fieldInput}
                placeholder="Enter your email"
              />
            </View>

            <Text style={styles.sectionTitle}>Change Password</Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Old Password</Text>
              <TextInput
                style={styles.fieldInput}
                secureTextEntry={true}
                placeholder="Enter your password"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>New Password</Text>
              <TextInput
                style={styles.fieldInput}
                secureTextEntry={true}
                placeholder="Enter your new password"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldText}>Repeat New Password</Text>
              <TextInput
                style={styles.fieldInput}
                secureTextEntry={true}
                placeholder="Repeat new password"
              />
            </View>
          </View>

          <View style={styles.botContainer}>
            <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ManageAccount;
