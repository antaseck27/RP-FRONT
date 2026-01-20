// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// Configuration Firebase (remplace les valeurs par les informations de ton projet Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBC0bvf7jSiO6sarlQyEALUoC9FLX9kll8",
  authDomain: "red-prod-auth.firebaseapp.com",
  projectId: "red-prod-auth",
  storageBucket: "red-prod-auth.appspot.com",
  messagingSenderId: "773609411931",
  appId: "1:773609411931:web:d153f5f22536150f4e367e"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail };
