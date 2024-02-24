import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import createNewUserCollectionAsync from "../firebaseServices/createNewUserCollectionAsync";

interface RegisterParams {
  email: string;
  password: string;
  username: string;
  phone: string;
}

export const registerUser = async ({ email, password, username, phone }: RegisterParams): Promise<boolean> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "login", user.uid), {
            Name: username,
            Email: email,
            PhoneNumber: phone,
            CreatedAt: new Date().toUTCString(),
        });
        createNewUserCollectionAsync(user.uid,email,phone,username,password)
        console.log("account created successfully 🎉");
        return true; // Return true if everything above was successful
    } catch (err: any) {
        console.log(err.message); 
        return false; // Return false if an error occurred
    }
};
