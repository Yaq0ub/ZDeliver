import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface RegisterParams {
  email: string;
  password: string;
  username: string;
  phone: string;
}

export const loginUser = async ({ email, password, username, phone }: RegisterParams): Promise<boolean> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "login", user.uid), {
            Name: username,
            Email: email,
            PhoneNumber: phone,
            CreatedAt: new Date().toUTCString(),
        });
        console.log("account logged in successfully 🎉");
        return true; // Return true if everything above was successful
    } catch (err: any) {
        console.log(err.message); 
        return false; // Return false if an error occurred
    }
};
