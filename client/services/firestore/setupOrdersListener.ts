// Import statements for Firebase Firestore and application-specific configurations
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig'; // Import Firebase database and auth configurations

import { AppDispatch } from '../../redux/store'; // Import type for Redux dispatch function
import { OrderType } from '../../constants/types'; // Import the type definition for orders
import { updateOrders } from '../../redux/features/account/orders/ordersSlice'; // Import the Redux action for updating orders

/**
 * Initializes real-time Firestore listeners for a user's order history.
 * This function listens for any changes to the user's orders collection in Firestore and updates the application state accordingly.
 * It provides a way to automatically synchronize the user's orders with the application state, ensuring that the UI reflects the most current data.
 * 
 * @param {AppDispatch} dispatch - The Redux dispatch function used to update the store.
 * @returns {() => void} A cleanup function that can be called to unsubscribe from the Firestore listeners.
 * 
 * @throws {Error} Throws an error if no authenticated user is found.
 */
export const setupOrdersListeners = (dispatch: AppDispatch): () => void => {
  // Retrieve the current authenticated user
  const user = auth.currentUser;
  
  // If no user is authenticated, throw an error
  if (!user) {
    throw new Error("No authenticated user found.");
  }
  
  // Define a reference to the 'orders' collection for the current user
  const CollectionRef = collection(db, 'Users', user.uid, 'orders');
  
  // Initialize a Firestore listener on the 'orders' collection
  const unsubscribe = onSnapshot(CollectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
    // Transform Firestore documents into an array of OrderType objects
    const list: OrderType[] = snapshot.docs
        .filter(doc => doc.id !== '0') // Ensure the document has an ID (optional filter step, might be redundant)
        .map(doc => ({
            ...doc.data() as OrderType // Cast document data to OrderType and spread into a new object
        }));
    
    // Dispatch an action to update the orders in the Redux store
    dispatch(updateOrders(list));
  });

  // Return a cleanup function that unsubscribes from the Firestore listener
  return () => {
    unsubscribe();
  };
};
