import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../components/CustomInput';
import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

import { AddressType } from '../constants/types';
import { addToAddressesAsync } from '../redux/features/account/addresses/addressesSlice';

export default function AddAddress() {
  const [address, setAddress] = useState<AddressType>({
    id: '-1',
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
      addToAddressesAsync(address);
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

const styles = StyleSheet.create({
    fullFlex: {
        flex: 1,
    },
    container: {
        padding: 20,
        justifyContent: 'space-around',
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingLeft: 10,
        marginVertical: "2%",
        marginBottom: "4%"
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
