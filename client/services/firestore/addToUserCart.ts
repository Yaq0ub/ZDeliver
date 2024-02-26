// Import Firestore functions for document and collection manipulation
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
// Import the Firebase database and authentication instances from the configuration file
import { db, auth } from "../../firebase/firebaseConfig";

// Import the type definition for items to ensure type safety
import { ProductItemType } from "../../constants/types";

/**
 * Adds an item to the authenticated user's shopping cart or updates its quantity if it already exists.
 * This function first checks for the current user's authentication status. If a user is authenticated,
 * it proceeds to check if the specified item is already present in the user's cart. If the item exists,
 * its count is incremented by one. If it does not exist, the item is added to the cart with a count of 1.
 * This operation is performed in the Firestore database, specifically within the 'Users' collection,
 * under a document matching the user's UID, and within the 'cart' subcollection of that document.
 * 
 * @param {ProductItemType} item - The item to be added or updated in the user's cart.
 *                                This item must adhere to the ProductItemType structure.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws {Error} Throws an error if no authenticated user is found.
 */
export const addToUserCart = async (item: ProductItemType): Promise<void> => {
  // Retrieve the current authenticated user from Firebase Authentication
  const user = auth.currentUser;

  // Throw an error if no user is authenticated
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Reference to the document for the current user in the 'Users' collection
  const userDocRef = doc(db, 'Users', user.uid);
  // Reference to the 'cart' subcollection within the user's document
  const cartCollectionRef = collection(userDocRef, 'cart');
  // Reference to a specific item document within the cart, identified by the item's ID
  const itemDocRef = doc(cartCollectionRef, item.id);

  // Attempt to retrieve the document for the specified item
  const docSnap = await getDoc(itemDocRef);

  // If the document exists, increment the item's count
  if (docSnap.exists()) {
    await updateDoc(itemDocRef, {
      count: docSnap.data().count + 1
    });
  } else {
    // If the document does not exist, create a new document for the item with a count of 1
    await setDoc(itemDocRef, {
      ...item,
      count: 1
    });
  }
};
