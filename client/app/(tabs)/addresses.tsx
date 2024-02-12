import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Addresses;