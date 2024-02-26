// Import required functions from Firebase Firestore for document manipulation
import { doc, setDoc, collection } from "firebase/firestore";
// Import Firebase database and authentication instances from the project's Firebase configuration
import { db, auth } from "../../firebase/firebaseConfig";

// Import the OrderType type definition to enforce type safety
import { OrderType } from "../../constants/types";

/**
 * Adds a new order to the authenticated user's collection of orders in Firestore.
 * This function attempts to add a provided order object to a user-specific 'orders'
 * subcollection within the Firestore database. Each order is uniquely identified within
 * the collection by its 'orderId' property, serving as a document ID. If an order with
 * the same 'orderId' already exists, it will be overwritten with the new order data. This function
 * requires that the user is authenticated; otherwise, it throws an error.
 * 
 * @param {OrderType} order - The order object to be added. Must conform to the OrderType interface.
 * @returns {Promise<void>} A promise that resolves when the order has been successfully added or
 *                          rejects with an error if the operation fails or if no user is authenticated.
 * @throws {Error} Throws an error if no authenticated user is found or if the Firestore operation fails.
 */
export const addToUserOrders = async (order: OrderType): Promise<void> => {
  // Check for an authenticated user
  const user = auth.currentUser;

  // Throw an error if no user is currently authenticated
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // Reference to the current user's document in the 'Users' collection
  const userDocRef = doc(db, 'Users', user.uid);
  // Reference to the 'orders' subcollection within the user's document
  const ordersCollectionRef = collection(userDocRef, 'orders');
  // Create a document reference within the 'orders' collection, using the order's 'orderId' as the document ID
  const orderDocRef = doc(ordersCollectionRef, order.id); // Using orderId as a unique identifier; adjust if necessary

  // Attempt to write the order document to Firestore
  await setDoc(orderDocRef, order).catch((error) => {
    // Log and rethrow any errors encountered during the Firestore write operation
    console.error("Error writing document to user's orders collection: ", error);
    throw new Error("Failed to add order to user's collection.");
  });
};
