// Import required functions from Firebase Firestore for document manipulation
import { doc, setDoc, collection } from "firebase/firestore";
// Import Firebase database and authentication instances from the project's Firebase configuration
import { db, auth } from "../../firebase/firebaseConfig";

// Import the PaymentType type definition to enforce type safety
import { PaymentType } from "../../constants/types";

/**
 * Adds a new payment method to the authenticated user's collection of payment methods in Firestore.
 * This function attempts to add a provided payment object to a user-specific 'payments'
 * subcollection within the Firestore database. Each payment method is uniquely identified within
 * the collection by its 'paymentId' property, serving as a document ID. If a payment method with
 * the same 'paymentId' already exists, it will be overwritten with the new payment data. This function
 * requires that the user is authenticated; otherwise, it throws an error.
 * 
 * @param {PaymentType} payment - The payment object to be added. Must conform to the PaymentType interface.
 * @returns {Promise<void>} A promise that resolves when the payment method has been successfully added or
 *                          rejects with an error if the operation fails or if no user is authenticated.
 * @throws {Error} Throws an error if no authenticated user is found or if the Firestore operation fails.
 */
export const addToUserPayments = async (payment: PaymentType): Promise<void> => {
  // Check for an authenticated user
  const user = auth.currentUser;

  // Throw an error if no user is currently authenticated
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Reference to the current user's document in the 'Users' collection
  const userDocRef = doc(db, 'Users', user.uid);
  // Reference to the 'payments' subcollection within the user's document
  const paymentCollectionRef = collection(userDocRef, 'payments');
  // Create a document reference within the 'payments' collection, using the payment's 'paymentId' as the document ID
  const paymentDocRef = doc(paymentCollectionRef, payment.id); // Using paymentId as a unique identifier; adjust if necessary

  // Attempt to write the payment document to Firestore
  await setDoc(paymentDocRef, payment).catch((error) => {
    // Log and rethrow any errors encountered during the Firestore write operation
    console.error("Error writing document to user's payment collection: ", error);
    throw new Error("Failed to add payment method to user's collection.");
  });
};
