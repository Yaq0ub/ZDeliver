import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ConfirmationModal from '../../../../components/ConfirmationModal'; // Import the ConfirmationModal component

// Import the OrderType interface
import { OrderType, ProductItemType } from '../../../../constants/types';

// Import styles
import Shadows from '../../../../constants/Shadows';
import Colors from '../../../../constants/Colors';

// Define props interface for OrderCard component
interface OrderCardProps {
    order: OrderType; // OrderType object to display
}

/**
 * Function to convert order items to a string.
 * @param {ProductItemType[]} orderItems - The array of order items.
 * @returns {string} A string representing the order items in the format "count1 x item1name, count2 x item2name, ..."
 */
const orderItemsToString = (orderItems: ProductItemType[]): string => {
    return orderItems.map((item) => `${item.count} x ${item.name}`).join(', ');
};

/**
 * OrderCard component displays the details of an order.
 * It takes an OrderType object as a prop and renders its properties.
 *
 * @param {OrderCardProps} props - The props for the OrderCard component.
 * @param {OrderType} props.order - The order object to display.
 * @returns {JSX.Element} JSX element representing the OrderCard component.
 */
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {

    // State to manage visibility of the confirmation modal
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    // Function to confirm deletion
    const confirmDelete = () => {
        setIsConfirmationVisible(false); // Hide the confirmation modal
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setIsConfirmationVisible(false); // Hide the confirmation modal
    };

    // Render the order items as a string
    const orderItemsString = orderItemsToString(order.items);

    // Conditional rendering based on order.method
    if (order.method === 'pickup') {
        return (
            <View style={styles.container}>
                <Text style={styles.date}>{order.date.toString()}</Text>
                <Text style={styles.items}>{orderItemsString}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={styles.total}>{order.Total}</Text>
                    <Text style={styles.status}>{order.status}</Text>
                </View>
                <ConfirmationModal
                    visible={isConfirmationVisible}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </View>
        );
    } else if (order.method === 'delivery') {
        // Render delivery details
        return (
            <View style={styles.container}>
                <Text style={styles.date}>{order.date.toString()}</Text>
                <Text style={styles.items}>{orderItemsString}</Text>
                <Text style={styles.address}>{order.address}</Text>
                <Text style={styles.deliveryDetails}>{order.deliveryDetails}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={styles.total}>{order.Total}</Text>
                    <Text style={styles.status}>{order.status}</Text>
                </View>
                <ConfirmationModal
                    visible={isConfirmationVisible}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </View>
        );
    } else {
        // Invalid order method, return null or handle accordingly
        console.warn('Invalid order method:', order.method);
        return null;
    }
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
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date:{

    },
    address: {

    },
    deliveryDetails:{

    },
    items: {

    },
    total:{

    },
    status: {
        
    }

})
export default OrderCard;
