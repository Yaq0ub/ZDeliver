import { collection, onSnapshot, doc, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig'; // Adjust the import path as necessary
import { AppDispatch } from '../../redux/store'; // Adjust the import path as necessary
import { updateCart, updateSubtotal } from '../../redux/features/products/productsSlice'; // Adjust the import path as necessary
import { ProductItemType } from '../../constants/types'; // Adjust the import path as necessary

/**
 * Sets up real-time listeners for cart items and subtotal document in Firestore.
 * Returns a cleanup function that unsubscribes from the Firestore listeners.
 */
export const setupCartAndSubtotalListeners = (dispatch: AppDispatch): () => void => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user found.");
  }
  const cartCollectionRef = collection(db, 'Users', user.uid, 'cart');
  
  // Listener for cart items excluding the subtotal document
  const unsubscribeCart = onSnapshot(cartCollectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const cartItems: ProductItemType[] = snapshot.docs
          .filter(doc => doc.id !== "0")
          .map(doc => ({
              ...doc.data() as ProductItemType
          }));
      dispatch(updateCart(cartItems));
  });

  // Reference to the subtotal document
  const subtotalDocRef = doc(db, 'Users', user.uid, 'cart', '0');
  // Listener for the subtotal document
  const unsubscribeSubtotal = onSnapshot(subtotalDocRef, (doc) => {
      if (doc.exists()) {
          const data = doc.data();
          const subtotal = data.subtotal as number; // Assuming subtotal is a number
          dispatch(updateSubtotal(subtotal));
      }
  });

  // Return cleanup function
  return () => {
    unsubscribeCart();
    unsubscribeSubtotal();
  };
};
