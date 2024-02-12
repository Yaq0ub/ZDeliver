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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Payment;