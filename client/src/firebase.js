// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY1W9U2BMMmH3odmSZcGDOhHibrRhyFoI",
  authDomain: "e-sehat-77962.firebaseapp.com",
  projectId: "e-sehat-77962",
  storageBucket: "e-sehat-client.appspot.com",
  messagingSenderId: "1059712400079",
  appId: "1:1059712400079:web:794bc5647b769a773bd5ba",
  measurementId: "G-F0QFD36XN2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 