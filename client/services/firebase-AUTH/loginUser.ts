// Import the necessary Firebase services for authentication and Firestore database operations
import { auth, db } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/**
 * Defines the parameters required for logging in a user.
 */
interface LoginParams {
  email: string;
  password: string;
  // Additional fields like username and phone are commented out as they're not used for login
}

/**
 * Attempts to log in a user with the provided email and password.
 * 
 * This function uses Firebase Authentication to sign in the user. Upon successful login,
 * it currently logs a success message to the console. If needed, additional actions such
 * as tracking login times or updating user status can be implemented where the commented code is.
 *
 * @param {LoginParams} params - An object containing the user's email and password.
 * @returns {Promise<boolean>} A promise that resolves to true if login is successful, or false if it fails.
 */
export const loginUser = async ({ email, password }: LoginParams): Promise<boolean> => {
    try {
        // Attempt to sign in the user with the provided email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // The following lines are commented out but show how you could potentially
        // record the login event in Firestore for the signed-in user
        // const user = userCredential.user;
        // await setDoc(doc(db, "login", user.uid), {
        //     Email: user.email,
        //     loginAt: new Date().toUTCString(),
        // });

        // Log a success message to the console
        console.log("account logged in successfully 🎉");
        return true; // Indicate that the login was successful
    } catch (err: any) {
        // Log the error message for debugging purposes
        console.log(err.message);
        return false; // Indicate that the login failed due to an error
    }
};
