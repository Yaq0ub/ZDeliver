import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfirmationModal from '../../../../components/ConfirmationModal'; // Import the ConfirmationModal component

// Import the PaymentType interface
import { PaymentType } from '../../../../constants/types';

// Import styles
import Shadows from '../../../../constants/Shadows';
import Colors from '../../../../constants/Colors';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch } from '../../../hooks';
import { removeFromPaymentsAsync } from './paymentsSlice';

// Define props interface for PaymentCard component
interface PaymentCardProps {
  payment: PaymentType; // PaymentType object to display
}

/**
 * PaymentCard component displays the details of an payment.
 * It takes an PaymentType object as a prop and renders its properties.
 *
 * @param {PaymentCardProps} props - The props for the PaymentCard component.
 * @param {PaymentType} props.payment - The payment object to display.
 * @returns {JSX.Element} JSX element representing the PaymentCard component.
 */
const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {

  const dispatch = useAppDispatch();
  // State to manage visibility of the confirmation modal
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  // Function to handle delete action
  const handleDelete = () => {
    setIsConfirmationVisible(true); // Show the confirmation modal
    console.log('Delete button pressed for payment:', payment.name);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    setIsConfirmationVisible(false); // Hide the confirmation modal
    dispatch(removeFromPaymentsAsync(payment)); // Dispatch the onDelete action to delete the payment
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setIsConfirmationVisible(false); // Hide the confirmation modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{payment.name}</Text>
      <Text style={styles.number}>**** **** **** {payment.last4}</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.expiry}>{payment.expiration}</Text>
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
        borderWidth: 0.1,
        borderColor: Colors.primary
    },
    name: {
        fontWeight: 'bold',
        //marginBottom: 5,
    },
    number: {

    },
    trashIconContainer: {

    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        color: Colors.primary
    },
    expiry: {

    }
})

export default PaymentCard;
