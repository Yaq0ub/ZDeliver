import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { updateAddress, updateMethod, updatePayment } from './checkoutSlice';
import AddressViewer from './AddressViewer';
import Colors from "../../../../constants/Colors";
import Shadows from "../../../../constants/Shadows";

import { AddressType } from '../../../../constants/types';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
/**
 * CheckoutOptionsSelector component allows users to select their delivery method, address, and payment method.
 * It conditionally renders information based on the selected options and the available data.
 */
const CheckoutOptionsSelector: React.FC = () => {
  const methods = ['pickup', 'delivery'];
  const addresses = useAppSelector((state) => state.addresses.list);
  const payments = useAppSelector((state) => state.payments.list);
  const dispatch = useAppDispatch();

  const selectedMethod = useAppSelector((state) => state.checkout.method);
  const selectedAddress = useAppSelector((state) => state.checkout.address);
  const selectedPayment = useAppSelector((state) => state.checkout.payment);

  /**
   * Renders a card for selecting a delivery method.
   * @param {string} method - The delivery method.
   * @param {string} selected - The currently selected delivery method.
   * @returns {JSX.Element} A touchable opacity element representing the method card.
   */
  const renderMethodCard = (method: string, selected: string): JSX.Element => (
    <TouchableOpacity
      key={method}
      style={[styles.methodCard, method === selected && styles.selectedCard]}
      onPress={() => dispatch(updateMethod(method))}
    >
      <Text style={styles.methodText}>{method.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  /**
   * Renders a card for selecting an address.
   * @param {AddressType} address - The address to display.
   * @param {AddressType | undefined} selected - The currently selected address.
   * @returns {JSX.Element} A touchable opacity element representing the address card.
   */
  const renderAddressCard = (address: AddressType, selected: AddressType | undefined): JSX.Element => (
    <TouchableOpacity
      key={address.id}
      style={[styles.addressCard, address.id === selected?.id && styles.selectedCard]}
      onPress={() => dispatch(updateAddress(address))}
    >
      <Text style={[styles.addressText, { fontWeight: 'bold' }]}>{address.name}</Text>
      <Text style={styles.addressText}>{address.street1}</Text>
    </TouchableOpacity>
  );

  /**
   * Renders a card for selecting a payment method.
   * @param {any} payment - The payment method to display.
   * @param {any | undefined} selected - The currently selected payment method.
   * @returns {JSX.Element} A touchable opacity element representing the payment card.
   */
  const renderPaymentCard = (payment: any, selected: any | undefined): JSX.Element => (
    <TouchableOpacity
      key={payment.id}
      style={[styles.paymentCard, payment.id === selected?.id && styles.selectedCard]}
      onPress={() => dispatch(updatePayment(payment))}
    >
      <Text style={styles.paymentNumberText}>{payment.last4}</Text>
      <FontAwesome
        name="cc-visa"
        size={24}
        color={Colors.light}
        style={styles.visaIcon} />
      {/* <Text
        style={styles.paymentNameText}
        numberOfLines={1}
        ellipsizeMode='tail'
      > {payment.name}</Text> */}

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {selectedAddress && <AddressViewer address={selectedAddress} />}
      </View>

      <View style={styles.methodContainer}>
        <ScrollView horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.methodScrollContainer}>
          {methods.map(method => renderMethodCard(method, selectedMethod))}
        </ScrollView>
      </View>

      <View style={styles.tabContainer}>
        <Ionicons name="location" size={24} color={Colors.light} style={{ margin: 5 }} />
        {addresses.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
            contentContainerStyle={styles.scrollContainer}>
            {addresses.map(
              address => renderAddressCard(address, selectedAddress))}
          </ScrollView>
        ) : (
          // Add Ionicon for adding an address
          <TouchableOpacity onPress={() => {/* Navigate to add address screen */ }}>
            <Ionicons name="add-sharp" size={24} color={Colors.light} />
          </TouchableOpacity>
        )}
        <Ionicons name="add-sharp" size={24} color={Colors.light} />
      </View>


      <View style={styles.tabContainer}>
        <Ionicons name="card" size={24} color={Colors.light} style={{ margin: 5 }} />
        {payments.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
            contentContainerStyle={styles.scrollContainer}>
            {payments.map(
              payment => renderPaymentCard(payment, selectedPayment))}
          </ScrollView>
        ) : (
          // Add Ionicon for adding a payment method
          <TouchableOpacity onPress={() => {/* Navigate to add payment method screen */ }}>
            <Ionicons name="add-sharp" size={24} color={Colors.light} />
          </TouchableOpacity>
        )}
        <Ionicons name="add-sharp" size={24} color={Colors.light} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    
    height: '80%',
    ...Shadows.medium,
  },
  headerText: {
    fontWeight: 'bold',
    color: Colors.light,

  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodScrollContainer: {
    flexGrow: 1, // This will ensure it takes the necessary space for flex items
    justifyContent: 'center', // Centers the children horizontally in the container
    alignItems: 'center', // Centers the children vertically in the container
  },
  mapContainer: {
    width: '100%',
    height: '45%',
    backgroundColor: Colors.primary
  },
  methodContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center', // Centers the children along the primary axis
    alignItems: 'center', // Centers the children along the cross axis
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor:Colors.primary,
    borderRadius: 20,
    width: '100%',
    height: '20%',
  },
  methodCard: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    marginHorizontal: 5,
    //padding: 10, // Adjust padding as needed
    justifyContent: 'center', // Center children along the primary axis
    alignItems: 'center', // Center children along the cross axis
    ...Shadows.medium,
    width: '45%',
    height: '100%'
  },
  addressCard: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    ...Shadows.medium,
    //borderWidth: 0.3,
  // borderColor: Colors.border,
    margin: 2,
    width: 150,
    height: "100%",

  },
  paymentCard: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    ...Shadows.medium,
    margin: 2,
    width: 150,
    height: "100%",
  },
  selectedCard: {
    backgroundColor: "dodgerblue",
  },
  selectedText:{
    color: Colors.dark,
    
  },
  selectedPaymentText:{
    color: Colors.dark,
    
  },
  methodText: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: 'bold'
  },
  visaIcon:{
    alignSelf: "flex-end",
    //marginRight: 10,
    //marginTop: 10,
  },
  addressText: {
    color: Colors.dark,
    fontSize: 12
  },
  paymentNumberText: {
    //fontFamily: 'Michroma',
    color: Colors.dark,
    fontSize: 14,
    fontWeight: 'bold'
  },
  paymentNameText: {
    color: Colors.dark,
    //fontFamily: 'Michroma',
    fontSize: 12,
  },
 


});
export default CheckoutOptionsSelector;
