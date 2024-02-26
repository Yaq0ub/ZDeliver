import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";

/**
 * Initializes a subcollection with a placeholder document.
 * 
 * @param userId The user's unique ID.
 * @param subcollectionName The name of the subcollection to initialize.
 */
async function initializeSubcollection(userId: string, subcollectionName: string): Promise<void> {
  const placeholderDocRef = doc(collection(doc(db, 'Users', userId), subcollectionName), '0');
  await setDoc(placeholderDocRef, {
    initialized: true // or any other initial data
  });
}

/**
 * Creates a new user document and initializes subcollections for the user.
 * 
 * @param uid The unique ID of the user.
 * @param email The email of the user.
 * @param mobile The mobile number of the user.
 * @param name The name of the user.
 */
async function createNewUserCollectionAsync(uid: string, email: string, mobile: string, name: string): Promise<void> {
  try {
    // Create the new user document
    await setDoc(doc(db, 'Users', uid), {
      email,
      mobile,
      name
    });

    // Initialize subcollections
    await initializeSubcollection(uid, 'cart');
    await initializeSubcollection(uid, 'orders');
    await initializeSubcollection(uid, 'addresses');
    await initializeSubcollection(uid, 'payments');

    console.log('User and subcollections created successfully');
  } catch (error) {
    console.error('Error creating user and subcollections: ', error);
  }
}

export default createNewUserCollectionAsync;
