import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from '../../styles/addresses.styles';

const Addresses = () => {
  const savedAddresses: ArrayLike<any> | null | undefined = []; // Replace with your actual data

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={14} color="black" />
        <TextInput placeholder="Search for address" style={styles.input} />
      </View>

      <Text style={styles.header}>Saved Addresses</Text>
      <FlatList
        data={savedAddresses}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Addresses;