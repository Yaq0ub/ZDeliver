import React, {useState} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ConfirmationModal from '../../../../components/ConfirmationModal'; // Import the ConfirmationModal component

// Import the AddressType interface
import { AddressType } from '../../../../constants/types';

// Import styles
import Shadows from '../../../../constants/Shadows';
import Colors from '../../../../constants/Colors';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch } from '../../../../redux/hooks';
import { removeFromAddressesAsync } from './addressesSlice';

// Define props interface for AddressCard component
interface AddressCardProps {
  address: AddressType; // AddressType object to display
}

/**
 * AddressCard component displays the details of an address.
 * It takes an AddressType object as a prop and renders its properties.
 *
 * @param {AddressCardProps} props - The props for the AddressCard component.
 * @param {AddressType} props.address - The address object to display.
 * @returns {JSX.Element} JSX element representing the AddressCard component.
 */
const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const formattedAddress = `${address.area}, ${address.street1}, ${address.street2}, ${address.city}, ${address.zipcode}`;
  const dispatch = useAppDispatch();
  // State to manage visibility of the confirmation modal
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  // Function to handle delete action
  const handleDelete = () => {
    setIsConfirmationVisible(true); // Show the confirmation modal
    console.log('Delete button pressed for address:', address.name);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    setIsConfirmationVisible(false); // Hide the confirmation modal
    dispatch(removeFromAddressesAsync(address)); // Dispatch the onDelete action to delete the address
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setIsConfirmationVisible(false); // Hide the confirmation modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{address.name}</Text>
      <Text style={styles.address}>{formattedAddress}</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.phone}>Phone: {address.phone}</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.trashIconContainer}>
          <Ionicons name="trash-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        visible={isConfirmationVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    //alignItems: 'center', // Vertically center the content in the row
    backgroundColor: Colors.light, // Background color for the item container
    borderRadius: 20, // Round the corners of the item container
    overflow: 'hidden', // Ensure child views are within the bounds of rounded corners
    ...Shadows.medium, // Apply medium shadow from your constants
    padding: 20, // Add padding around the contents
  },
  name: {
    fontWeight: 'bold',
    //marginBottom: 5,
  },
  address: {
    
  },
  phone: {

  },
  trashIconContainer: {
    //position: 'absolute',
    //bottom: 10,
    //right: 10,
  },
  icon:{
    color: Colors.primary
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent:'space-between'
  }
});
export default AddressCard;
