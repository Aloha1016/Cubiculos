// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import { getAuth}     from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  



  apiKey: "AIzaSyDI48w4GGyMzPY8AERb-BCtLeQEjPHXceM",
  authDomain: "cubiculos-biblioteca.firebaseapp.com",
  projectId: "cubiculos-biblioteca",
  storageBucket: "cubiculos-biblioteca.appspot.com",
  messagingSenderId: "989946302283",
  appId: "1:989946302283:web:b7139f1d16c4062b8e22ce",
  measurementId: "G-N1ZTPBE4VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore (app)


export {db};
// export  default{auth};