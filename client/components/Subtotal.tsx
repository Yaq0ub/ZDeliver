import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAppSelector } from '../redux/hooks';

const Subtotal = () => {
  const fees = useAppSelector((state)=>state.products.fees)
  const subtotal = useAppSelector((state)=>state.products.subTotal)
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.fieldName}>Fees:</Text>
        <Text style={styles.value}>${fees.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.fieldName}>Subtotal:</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldName: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Subtotal;
