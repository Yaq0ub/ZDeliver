import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';

import OrdersList from '../../redux/features/account/orders/OrdersList';

export default function Orders(){
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.fullFlex}

      >
        <View style={styles.container}>
          {/* Saved orders List Container */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Orders</Text>
          </View>
          <View style={styles.listContainer}>
            <OrdersList />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
