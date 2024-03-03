import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Import styles


const Privacy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location Access</Text>
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
    },
});

export default Privacy;