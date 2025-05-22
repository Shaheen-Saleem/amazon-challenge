import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: "challenge-db720.firebaseapp.com",
    projectId: "challenge-db720",
    storageBucket: "challenge-db720.appspot.com",
    messagingSenderId: "749524442396",
    appId: "1:749524442396:web:d3b3e0cfa6888e6f2b6ed9",
    measurementId: "G-EXL83VRLKX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
