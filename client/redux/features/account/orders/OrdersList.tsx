import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// Import the OrderType interface
import { OrderType } from '../../../../constants/types';

// Import the OrderCard component
import OrderCard from './OrderCard';

// Import the RootState type from Redux store
import { RootState } from '../../../store';

/**
 * OrdersList component displays a list of orders using OrderCard components.
 * It retrieves the orders from the Redux store and renders OrderCard for each order.
 *
 * @returns {JSX.Element} JSX element representing the OrdersList component.
 */
const OrdersList: React.FC = () => {
  // Retrieve the orders array from the Redux store using useSelector hook
  const orders = useSelector((state: RootState) => state.orders.list);
  useEffect(() => {

  }, [orders]); // `dispatch` is stable and doesn't change, so it's safe to include it here
  /**
   * Render function for each OrderCard item in the FlatList.
   * @param {object} item - The item object representing a order.
   * @returns {JSX.Element} JSX element representing an OrderCard component.
   */
  const renderItem = ({ item }: { item: OrderType }) => {
    return <OrderCard order={item} />;
  };

  return (
    <FlatList
      data={orders} // Pass the orders array from Redux store as data to FlatList
      renderItem={renderItem} // Render each item using the renderItem function
      keyExtractor={(item) => item.id} // Use item's ID as key; generate a random key if not available
      showsVerticalScrollIndicator={false} // Remove vertical scroll indicator
      showsHorizontalScrollIndicator={false} // Remove horizontal scroll indicator (if applicable)
    />
  );
};

export default OrdersList;
