// Import Firebase authentication and database services
import { auth, db } from "../../firebase/firebaseConfig";
// Import the function for creating a user with email and password from Firebase authentication
import { createUserWithEmailAndPassword } from "firebase/auth";
// Import Firestore's document reference and set document functions
import { doc, setDoc } from "firebase/firestore";
// Import a utility function for initializing a new user's Firestore collections
import createNewUserCollectionAsync from "../firestore/createNewUserCollectionAsync";

// Define the types for the registration parameters
interface RegisterParams {
  email: string;
  password: string;
  username: string;
  phone: string;
}

/**
 * Registers a new user using their email and password, and initializes their profile
 * and collections in Firestore.
 *
 * @param {RegisterParams} params - An object containing the user's email, password, username, and phone number.
 * @returns {Promise<boolean>} - A promise that resolves to true if the registration was successful, or false if an error occurred.
 */
export const registerUser = async ({ email, password, username, phone }: RegisterParams): Promise<boolean> => {
    try {
        // Create a new user with the provided email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; // Extract the user detail from the credential response

        // The following code is commented out as it seems to be replaced with `createNewUserCollectionAsync`
        // but it's an example of how to directly set a document for a new user in Firestore
        // await setDoc(doc(db, "login", user.uid), {
        //     Name: username,
        //     Email: email,
        //     PhoneNumber: phone,
        //     CreatedAt: new Date().toUTCString(),
        // });

        // Initialize the new user's collections in Firestore
        createNewUserCollectionAsync(user.uid, email, phone, username);
        console.log("account created successfully 🎉");

        return true; // Indicates successful account creation
    } catch (err: any) {
        // Log the error message for debugging purposes
        console.log(err.message); 
        return false; // Indicates an error occurred during account creation
    }
};
