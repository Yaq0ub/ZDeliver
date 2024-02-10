// hangleLogin.tsx
import { FIREBASE_AUTH } from "../../firebaseConfig";

import { signInWithEmailAndPassword } from "firebase/auth";

const handleLogin = (email: string, password: string) => {
    const auth = FIREBASE_AUTH;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User login", user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error: ", errorMessage)
        });
};

export default handleLogin