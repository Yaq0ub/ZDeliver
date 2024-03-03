import { doc, getDoc, deleteDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";
import { PaymentType } from "../../constants/types";

/**
 * Attempts to remove a specified payment from the authenticated user's payment collection in Firestore.
 * If the payment exists, it is deleted. If not, a log message is displayed indicating the payment was not found.
 * 
 * @param payment An object of type PaymentType representing the payment to be removed.
 * @returns A promise that resolves to void, indicating the function does not return a value but performs an asynchronous operation.
 */
export const removeFromUserPayments = async (payment: PaymentType): Promise<void> => {
  // Obtain the current authenticated user from Firebase Authentication
  const user = auth.currentUser;

  // Throw an error if no user is currently authenticated, as the operation requires a user context
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  // References to the user's document and the specific payments collection within Firestore
  const userDocRef = doc(db, 'Users', user.uid);
  const paymentsCollectionRef = collection(userDocRef, 'payments');
  const paymentDocRef = doc(paymentsCollectionRef, payment.id); // Assuming 'id' is the unique identifier for payments

  // Attempt to retrieve the document snapshot for the specified payment
  const docSnap = await getDoc(paymentDocRef);

  // If the document exists, proceed to delete the payment
  if (docSnap.exists()) {
    await deleteDoc(paymentDocRef);
  } else {
    // Log a message if the payment is not found within the user's collection
    console.log('Payment not found in payments');
  }
};
