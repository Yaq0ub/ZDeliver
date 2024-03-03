import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { router } from 'expo-router';

import PaymentsList from '../../redux/features/account/payments/PaymentsList';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';



export default function Payments(){
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.fullFlex}

      >
        <View style={styles.container}>
          {/* Saved Payments List Container */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Saved Payments</Text>
            <Ionicons name="add-circle" size={34} color={Colors.primary} onPress={() => { router.push('addpayment' as any) }} />
          </View>
          <View style={styles.listContainer}>
            <PaymentsList />
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
