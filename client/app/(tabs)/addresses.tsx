import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../styles/addresses.styles';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';

import AddressList from '../../redux/features/account/AddressesList';

const Addresses = () => {
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.fullFlex}

      >
        <View style={styles.container}>
          {/* Saved Addresses List Container */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Saved Addresses</Text>
            <Ionicons name="add-circle" size={34} color={Colors.primary} onPress={() => { router.push('addaddress' as any) }} />
          </View>
          <View style={styles.listContainer}>
            <AddressList />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Addresses;