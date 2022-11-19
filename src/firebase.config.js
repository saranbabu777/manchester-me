import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_Firbase_apiKey,
    authDomain: process.env.REACT_APP_Firbase_authDomain,
    projectId: process.env.REACT_APP_Firbase_projectId,
    storageBucket: process.env.REACT_APP_Firbase_storageBucket,
    messagingSenderId: process.env.REACT_APP_Firbase_messagingSenderId,
    appId: process.env.REACT_APP_Firbase_appId,
    measurementId: process.env.REACT_APP_Firbase_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);