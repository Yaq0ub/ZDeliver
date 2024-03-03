import { collection, onSnapshot, doc, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig'; // Import database and authentication modules from the Firebase config

import { AppDispatch } from '../../redux/store'; // Import the AppDispatch type from the Redux store setup
import { PaymentType } from '../../constants/types'; // Import the PaymentType interface/type for TypeScript type checking
import { updatePayments } from '../../redux/features/account/payments/paymentsSlice'; // Import the updatePayments action creator from the account slice

/**
 * Initializes real-time Firestore listeners for the payments collection associated with the current user.
 * It listens for any changes in the user's payments collection and dispatches an action to update the Redux store accordingly.
 * 
 * @param {AppDispatch} dispatch - The Redux store dispatch function used to update the store with new payments data.
 * @returns {() => void} A cleanup function that can be called to unsubscribe from the Firestore listeners to prevent memory leaks.
 * 
 * @throws {Error} Throws an error if no authenticated user is found, ensuring the function only runs for logged-in users.
 */
export const setupPaymentsListeners = (dispatch: AppDispatch): () => void => {
  // Retrieve the current authenticated user
  const user = auth.currentUser;

  // Throw an error if no user is authenticated when this function is called
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Define the Firestore collection reference path dynamically based on the authenticated user's UID
  const CollectionRef = collection(db, 'Users', user.uid, 'payments');
  
  // Setup a Firestore onSnapshot listener for the specified collection reference
  // This will trigger every time there is a change in the 'payments' collection for the authenticated user
  const unsubscribe = onSnapshot(CollectionRef, 
    (snapshot: QuerySnapshot<DocumentData>) => {
    // Map through the documents returned in the snapshot, filtering and transforming them into the PaymentType shape
    const list: PaymentType[] = snapshot.docs
      .filter(doc => doc.id !== '0') // Filter out any documents without an ID, if necessary
      .map(doc => ({
          ...doc.data() as PaymentType // Cast the document data to the PaymentType interface
      }));
    // Dispatch the updatePayments action to update the Redux store with the new payments data
    dispatch(updatePayments(list));
  });

  // Return a cleanup function that unsubscribes from the Firestore listener
  return () => {
    unsubscribe();
  };
};
