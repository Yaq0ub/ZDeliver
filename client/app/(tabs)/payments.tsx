import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Payment = () => {
  const savedPayments: ArrayLike<any> | null | undefined = []; // Replace with your actual data
  const paymentMethods: ArrayLike<any> | null | undefined = []; // Replace with your actual data

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Payments</Text>
      <FlatList
        data={savedPayments}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.header}>Add Payment Method</Text>
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Text>{item}</Text>
            <AntDesign name="caretright" size={14} color="black" />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Payment;