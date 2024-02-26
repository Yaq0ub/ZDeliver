import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

// Import the AddressType interface
import { AddressType } from '../../../constants/types';

// Import the AddressCard component
import AddressCard from './AddressCard';

// Import the RootState type from Redux store
import { RootState } from '../../../redux/store';

/**
 * AddressList component displays a list of addresses using AddressCard components.
 * It retrieves the addresses from the Redux store and renders AddressCard for each address.
 *
 * @returns {JSX.Element} JSX element representing the AddressList component.
 */
const AddressList: React.FC = () => {
  // Retrieve the addresses array from the Redux store using useSelector hook
  const addresses = useSelector((state: RootState) => state.account.addresses);
  useEffect(() => {

  }, [addresses]); // `dispatch` is stable and doesn't change, so it's safe to include it here
  /**
   * Render function for each AddressCard item in the FlatList.
   * @param {object} item - The item object representing an address.
   * @returns {JSX.Element} JSX element representing an AddressCard component.
   */
  const renderItem = ({ item }: { item: AddressType }) => {
    return <AddressCard address={item} />;
  };

  return (
    <FlatList
      data={addresses} // Pass the addresses array from Redux store as data to FlatList
      renderItem={renderItem} // Render each item using the renderItem function
      keyExtractor={(item) => item.name} // Use item's ID as key; generate a random key if not available
      showsVerticalScrollIndicator={false} // Remove vertical scroll indicator
      showsHorizontalScrollIndicator={false} // Remove horizontal scroll indicator (if applicable)
    />
  );
};

export default AddressList;
