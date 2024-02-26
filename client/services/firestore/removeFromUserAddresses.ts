// Firestore and Firebase authentication imports for database operations and user authentication
import { doc, getDoc, deleteDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig"; // Ensure the import path matches your project structure

// Type import for strict type checking, improving code reliability and maintainability
import { AddressType } from "../../constants/types"; // Adjust import path to match your project structure

/**
 * Attempts to remove a specified address from the authenticated user's address collection in Firestore.
 * If the address exists, it is deleted. If not, a log message is displayed indicating the address was not found.
 * 
 * @param item An object of type AddressType representing the address to be removed.
 * @returns A promise that resolves to void, indicating the function does not return a value but performs an asynchronous operation.
 */
export const removeFromUserAddresses = async (item: AddressType): Promise<void> => {
  // Obtain the current authenticated user from Firebase Authentication
  const user = auth.currentUser;

  // Throw an error if no user is currently authenticated, as operation requires a user context
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // References to the user's document and the specific addresses collection within Firestore
  const userDocRef = doc(db, 'Users', user.uid); // Reference to the user's document
  const addressesCollectionRef = collection(userDocRef, 'addresses'); // Reference to the user's addresses collection
  const itemDocRef = doc(addressesCollectionRef, item.name); // Specific address document reference

  // Attempt to retrieve the document snapshot for the specified address
  const docSnap = await getDoc(itemDocRef);

  // If the document exists, proceed to delete the address
  if (docSnap.exists()) {
    await deleteDoc(itemDocRef);
  } else {
    // Log a message if the address is not found within the user's collection
    console.log('Address not found in addresses');
  }
};
