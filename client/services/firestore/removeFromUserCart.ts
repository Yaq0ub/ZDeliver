// Import necessary Firestore functions for document manipulation and retrieval
import { doc, getDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
// Import the Firebase configuration, including the database reference (db) and authentication service (auth)
import { db, auth } from "../../firebase/firebaseConfig"; // Ensure the import path is correct for your project structure
// Import the type definition for items stored in the cart for type safety and clarity
import { ProductItemType } from "../../constants/types"; // Adjust the import path as necessary for your project

/**
 * Asynchronously removes an item from the authenticated user's cart in Firestore.
 * If the item's quantity (`count`) is greater than 1, it decrements the quantity by 1.
 * If the quantity is exactly 1, it removes the item from the cart entirely.
 * 
 * @param {ProductItemType} item - The cart item to be removed or decremented. Must include an `id` field and a `count` field.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete. Returns nothing.
 * 
 * @throws {Error} - Throws an error if no authenticated user is currently logged in.
 */
export const removeFromUserCart = async (item: ProductItemType): Promise<void> => {
  // Retrieve the current authenticated user from Firebase Authentication
  const user = auth.currentUser;

  // If no user is authenticated, throw an error to prevent further execution
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Define references to the user's document and the specific item document within their cart collection
  const userDocRef = doc(db, 'Users', user.uid); // Reference to the user's document
  const cartCollectionRef = collection(userDocRef, 'cart'); // Reference to the user's cart collection
  const itemDocRef = doc(cartCollectionRef, item.id); // Reference to the specific item in the cart

  // Attempt to retrieve the document for the specific cart item
  const docSnap = await getDoc(itemDocRef);

  // Check if the document exists
  if (docSnap.exists()) {
    const currentCount = docSnap.data().count; // Retrieve the current item count
    if (currentCount > 1) {
      // If the count is greater than 1, decrement the count
      await updateDoc(itemDocRef, {
        count: currentCount - 1
      });
    } else {
      // If the count is exactly 1, remove the item from the cart
      await deleteDoc(itemDocRef);
    }
  } else {
    // Log to the console if the item was not found in the cart
    console.log('Item not found in the cart');
  }
};
