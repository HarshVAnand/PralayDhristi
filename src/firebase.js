// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbCxF113OFfc2116-_aj6zXIFtLwMADyc",
  authDomain: "pralaydhristi.firebaseapp.com",
  projectId: "pralaydhristi",
  storageBucket: "pralaydhristi.firebasestorage.app",
  messagingSenderId: "136821434800",
  appId: "1:136821434800:web:2469e4b9eafe6b460b4e75",
  measurementId: "G-WS4V1D374D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);