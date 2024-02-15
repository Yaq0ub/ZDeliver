import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Import styles
import styles from '../../styles/privacy.styles'

const Privacy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location Access</Text>
    </View>
  );
};

export default Privacy;