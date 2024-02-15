import React from 'react';
import { View, Text, TextInput, Button} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context'

import styles from '../../styles/manage.styles'

import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ManageAccount = () => {
  const handleChangePassword = () => {router.push("/(tabs)/")}
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* Name */}
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

        {/* Password Change Section */}
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
        <View style={styles.button}>
          <TouchableOpacity onPress={handleChangePassword}>
            <Text style={styles.buttonText}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ManageAccount;