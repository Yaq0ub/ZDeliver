// Firebase Firestore imports for data manipulation and real-time updates
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
// Import Firebase configuration, including database (db) and authentication (auth) modules
import { db, auth } from '../../firebase/firebaseConfig'; // Path might need adjustment based on project structure

// Import Redux dispatch type for updating the Redux store
import { AppDispatch } from '../../redux/store';
// Import action creator for updating cart state within the Redux store
import { updateCart } from '../../redux/features/products/productsSlice';
// Import type definition for cart items
import { ProductItemType } from '../../constants/types';

/**
 * Initializes real-time listeners on the cart collection for the authenticated user in Firestore.
 * This enables the application to react to any changes in the cart items in real-time,
 * ensuring the UI is always in sync with the backend data without manual refreshes.
 * 
 * @param {AppDispatch} dispatch - The Redux dispatch function, used to emit actions to the Redux store.
 * @returns {() => void} - Returns a cleanup function that can be called to unsubscribe from the Firestore listeners,
 * preventing memory leaks or unnecessary data fetching when the component using this listener is unmounted.
 * 
 * @throws {Error} - Throws an error if no authenticated user is found, ensuring the function does not proceed without valid user context.
 */
export const setupCartListeners = (dispatch: AppDispatch): () => void => {
  // Attempt to retrieve the current authenticated user
  const user = auth.currentUser;
  
  // Throw an error if no user is authenticated, as the cart functionality requires a user context
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Define a reference to the 'cart' collection for the current authenticated user
  const CollectionRef = collection(db, 'Users', user.uid, 'cart');
  
  // Establish a real-time listener on the cart collection
  const unsubscribeCart = onSnapshot(CollectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
    // Process the snapshot to extract cart items, filtering and mapping the documents to conform to the ProductItemType
    const list: ProductItemType[] = snapshot.docs
        .filter(doc => doc.id !== '0') // This filter is a placeholder; in a real app, you might filter out specific documents
        .map(doc => ({
            ...doc.data() as ProductItemType // Ensure the document data matches the ProductItemType interface
        }));
    
    // Dispatch an action to update the cart items in the Redux store
    dispatch(updateCart(list));
  });

  // Return a cleanup function to unsubscribe from the Firestore listener when no longer needed
  return () => {
    unsubscribeCart();
  };
};
