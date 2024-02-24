import { doc, getDocs, updateDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig"; // Adjust the path as necessary

/**
 * Calculates the subtotal of the authenticated user's cart items in Firestore and updates
 * the subtotal in the cart's 'document 0'.
 */
export const calculateUserCartSubtotal = async (): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user found.");
  }

  const userDocRef = doc(db, 'Users', user.uid);
  const cartCollectionRef = collection(userDocRef, 'cart');
  const snapshot = await getDocs(cartCollectionRef);
  let subtotal = 0;
  
  snapshot.forEach(doc => {
    if (doc.id !== '0') { // Skip document 0 since it's used for storing subtotal
      const data = doc.data();
      const price = data.price || 0;
      const count = data.count || 0;
      subtotal += price * count;
    }
  });

  // Update the subtotal in document 0
  const subtotalDocRef = doc(cartCollectionRef, '0'); // Reference to the subtotal document
  await updateDoc(subtotalDocRef, { subtotal });
};
