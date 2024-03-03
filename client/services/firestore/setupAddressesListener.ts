// Importing necessary functions and types from Firebase Firestore for real-time database interaction
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
// Importing database (db) and authentication (auth) configurations from Firebase setup
import { db, auth } from '../../firebase/firebaseConfig'; // Ensure correct path based on project structure

// Importing the Redux store's dispatch type for dispatching actions
import { AppDispatch } from '../../redux/store';
// Importing the AddressType type definition for strong typing of addresses
import { AddressType } from '../../constants/types';
// Importing the Redux action for updating addresses in the account slice of the Redux state
import { updateAddresses } from '../../redux/features/account/addresses/addressesSlice';

/**
 * Initializes real-time listeners on the 'addresses' collection for the authenticated user in Firestore.
 * This function is crucial for syncing the user's addresses between the Firestore database and the application's state,
 * ensuring that any changes in the Firestore 'addresses' collection are immediately reflected in the application.
 * 
 * @param {AppDispatch} dispatch - The Redux dispatch function, used to update the Redux store with the new addresses.
 * @returns {() => void} - A cleanup function that, when called, unsubscribes from the Firestore listeners to prevent memory leaks.
 * 
 * @throws {Error} If no authenticated user is found, an error is thrown to halt the function execution,
 * ensuring that address synchronization only occurs for authenticated users.
 */
export const setupAddressesListeners = (dispatch: AppDispatch): () => void => {
  // Retrieving the current authenticated user from Firebase Authentication
  const user = auth.currentUser;

  // If no user is authenticated, throw an error to prevent further execution
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Defining a reference to the 'addresses' collection within the authenticated user's document
  const CollectionRef = collection(db, 'Users', user.uid, 'addresses');
  
  // Establishing a real-time listener on the 'addresses' collection
  const unsubscribeAddresses = onSnapshot(CollectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
    // Transforming the snapshot documents into an array of AddressType, filtering out any unnecessary documents
    const list: AddressType[] = snapshot.docs
        .filter(doc => doc.id !== '0') // This could be adjusted to exclude specific documents if needed
        .map(doc => ({
            ...doc.data() as AddressType // Casting the document data to AddressType to ensure type safety
        }));
    // Dispatching the updateAddresses action with the newly fetched address list to update the Redux state
    dispatch(updateAddresses(list));
  });

  // Returning a cleanup function that unsubscribes from the Firestore listener when it is no longer needed
  return () => {
    unsubscribeAddresses();
  };
};
