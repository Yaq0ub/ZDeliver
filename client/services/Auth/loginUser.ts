import { auth, db } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface LoginParams {
  email: string;
  password: string;
  //username: string;
  //phone: string;
}

export const loginUser = async ({ email, password}: LoginParams): Promise<boolean> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // const user = userCredential.user;
        // await setDoc(doc(db, "login", user.uid), {
        //     Email: user.email,
        //     loginAt: new Date().toUTCString(),
        // });
        console.log("account logged in successfully 🎉");
        return true; // Return true if everything above was successful
    } catch (err: any) {
        console.log(err.message); 
        return false; // Return false if an error occurred
    }
};
