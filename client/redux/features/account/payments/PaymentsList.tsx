import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// Import the PaymentType interface
import { PaymentType } from '../../../../constants/types';

// Import the PaymentCard component
import PaymentCard from './PaymentCard';

// Import the RootState type from Redux store
import { RootState } from '../../../store';

/**
 * PaymentList component displays a list of payments using PaymentCard components.
 * It retrieves the payments from the Redux store and renders PaymentCard for each payment.
 *
 * @returns {JSX.Element} JSX element representing the PaymentList component.
 */
const PaymentList: React.FC = () => {
  // Retrieve the payments array from the Redux store using useSelector hook
  const payments = useSelector((state: RootState) => state.payments.list);
  useEffect(() => {

  }, [payments]); // `dispatch` is stable and doesn't change, so it's safe to include it here
  /**
   * Render function for each PaymentCard item in the FlatList.
   * @param {object} item - The item object representing a payment.
   * @returns {JSX.Element} JSX element representing an PaymentCard component.
   */
  const renderItem = ({ item }: { item: PaymentType }) => {
    return <PaymentCard payment={item} />;
  };

  return (
    <FlatList
      data={payments} // Pass the payments array from Redux store as data to FlatList
      renderItem={renderItem} // Render each item using the renderItem function
      keyExtractor={(item) => item.id} // Use item's ID as key; generate a random key if not available
      showsVerticalScrollIndicator={false} // Remove vertical scroll indicator
      showsHorizontalScrollIndicator={false} // Remove horizontal scroll indicator (if applicable)
    />
  );
};

export default PaymentList;
