// Import required functions from Firebase Firestore for document manipulation
import { doc, setDoc, collection } from "firebase/firestore";
// Import Firebase database and authentication instances from the project's Firebase configuration
import { db, auth } from "../../firebase/firebaseConfig";

// Import the AddressType type definition to enforce type safety
import { AddressType } from "../../constants/types";

/**
 * Adds a new address to the authenticated user's collection of addresses in Firestore.
 * This function attempts to add a provided address object to a user-specific 'addresses'
 * subcollection within the Firestore database. Each address is uniquely identified within
 * the collection by its 'street1' property, serving as a document ID. If an address with the
 * same 'street1' already exists, it will be overwritten with the new address data. This function
 * requires that the user is authenticated; otherwise, it throws an error.
 * 
 * @param {AddressType} address - The address object to be added. Must conform to the AddressType interface.
 * @returns {Promise<void>} A promise that resolves when the address has been successfully added or
 *                          rejects with an error if the operation fails or if no user is authenticated.
 * @throws {Error} Throws an error if no authenticated user is found or if the Firestore operation fails.
 */
export const addToUserAddresses = async (address: AddressType): Promise<void> => {
  // Check for an authenticated user
  const user = auth.currentUser;

  // Throw an error if no user is currently authenticated
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Reference to the current user's document in the 'Users' collection
  const userDocRef = doc(db, 'Users', user.uid);
  // Reference to the 'addresses' subcollection within the user's document
  const addressCollectionRef = collection(userDocRef, 'addresses');
  // Create a document reference within the 'addresses' collection, using the address's 'street1' as the document ID
  const addressDocRef = doc(addressCollectionRef, address.name); // Using street1 as a unique identifier; adjust if necessary

  // Attempt to write the address document to Firestore
  await setDoc(addressDocRef, address).catch((error) => {
    // Log and rethrow any errors encountered during the Firestore write operation
    console.error("Error writing document to user's address collection: ", error);
    throw new Error("Failed to add address to user's collection.");
  });
};
