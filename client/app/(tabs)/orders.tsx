import React from 'react';
import { View, Text, FlatList} from 'react-native';

// Import styles
import styles from '../../styles/orders.styles'

const Orders = () => {
  const orders: ArrayLike<any> | null | undefined = []; // Replace with your actual data

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};



export default Orders;