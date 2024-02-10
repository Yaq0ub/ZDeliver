// handleSignup.tsx
import { FIREBASE_AUTH } from '../../firebaseConfig'

import { createUserWithEmailAndPassword } from 'firebase/auth';

const handleSignup = (email: string, password: string) => {
    const auth = FIREBASE_AUTH;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("User created",user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error: ", errorMessage)
            // ..
        });
};

export default handleSignup;
