import { db } from "../../firebase/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";

/**
 * Creates a new user document in the Users collection with specified fields
 * and initializes subcollections for the user (cart, addresses, payments, orders).
 * 
 * @param uid The unique ID of the user (user.uid).
 * @param email The email of the user.
 * @param mobile The mobile number of the user.
 * @param name The name of the user.
 * @param password The password of the user.
 */
async function createNewUserCollectionAsync(uid: string, email: string, mobile: string, name: string, password: string): Promise<void> {
  try {
    // Create the new user document with provided fields
    await setDoc(doc(db, 'Users', uid), {
      email,
      mobile,
      name,
      password
    });

    // Initialize cart collection with a document
    await setDoc(doc(collection(doc(db, 'Users', uid), 'cart'), '0'), {
      subtotal: 0
    });

    // Initialize orders collection with a document having "No"=0
    await setDoc(doc(collection(doc(db, 'Users', uid), 'orders'), '0'), {
      No: 0
    });

    // Initialize addresses collection with a document having "No"=0
    await setDoc(doc(collection(doc(db, 'Users', uid), 'addresses'), '0'), {
      No: 0
    });

    // Initialize payments collection with a document having "No"=0
    await setDoc(doc(collection(doc(db, 'Users', uid), 'payments'), '0'), {
      No: 0
    });

    console.log('User and subcollections created successfully');
  } catch (error) {
    console.error('Error creating user and subcollections: ', error);
  }
}

export default createNewUserCollectionAsync;
