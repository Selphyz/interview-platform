// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXBcQLEDA059dLWKuOrAltPsRERm9394s",
    authDomain: "interview-platform-273f8.firebaseapp.com",
    projectId: "interview-platform-273f8",
    storageBucket: "interview-platform-273f8.firebasestorage.app",
    messagingSenderId: "143061733201",
    appId: "1:143061733201:web:da9fd17525057d03df0d70",
    measurementId: "G-35TB3L8NPS"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);