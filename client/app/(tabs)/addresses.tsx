import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

import { router } from 'expo-router';

import AddressList from '../../redux/features/account/addresses/AddressesList';

export default function Addresses () {
  
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

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',

  },

  listContainer: {
    flex: 1,
  }
});