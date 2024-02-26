import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import styles from '../styles/addaddress.styles'; // Ensure this path is correct
import { AddressType } from '../constants/types'; // Ensure this path is correct
import { addToUserAddresses } from '../services/firestore/addToUserAddresses'; // Ensure this path is correct
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomInput from '../components/CustomInput';
export default function AddAddress() {
  const [address, setAddress] = useState<AddressType>({
    //id: '',
    name: '',
    area: '',
    street1: '',
    street2: '',
    city: '',
    zipcode: '',
    phone: '',
  });

   // Update the address state for each field using a curried function
   const handleTextChange = (field: keyof AddressType) => (text: string) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: text,
    }));
  };

  const handleAddAddress = () => {
    // Check if any field in the address is empty or null
    const isAnyFieldEmpty = Object.values(address).some((value) => value.trim() === '');
    if (isAnyFieldEmpty) {
      // Handle the case where one or more fields are empty
      // For example, show an alert or set an error state
      alert('Please fill in all fields.'); // Example alert; consider a more user-friendly feedback mechanism
    } else {
      // All fields are filled, proceed with adding the address
      addToUserAddresses(address);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView style={styles.fullFlex} contentContainerStyle={styles.container}>
        <CustomInput label="Name" value={address.name} onChangeText={handleTextChange('name')} />
          <CustomInput label="Area" value={address.area} onChangeText={handleTextChange('area')} />
          <CustomInput label="Street 1" value={address.street1} onChangeText={handleTextChange('street1')} />
          <CustomInput label="Street 2" value={address.street2} onChangeText={handleTextChange('street2')} />
          <CustomInput label="City" value={address.city} onChangeText={handleTextChange('city')} />
          <CustomInput label="Zipcode" value={address.zipcode} onChangeText={handleTextChange('zipcode')} keyboardType="numeric" />
          <CustomInput label="Phone" value={address.phone} onChangeText={handleTextChange('phone')} keyboardType="phone-pad" />
          <TouchableOpacity onPress={handleAddAddress} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
