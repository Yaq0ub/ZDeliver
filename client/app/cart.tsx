import { StatusBar } from 'expo-status-bar';
import { 
  Platform, 
  StyleSheet,
  Button
   } from 'react-native';

import { Text, View } from '../components/Themed';

import {router} from 'expo-router';

export default function CartScreen() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Button title="Checkout" onPress={() => router.push("checkout" as any)}/>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: "#ffffff"
  },
  title: {
    //fontSize: 20,
    //fontWeight: 'bold',
  },
});