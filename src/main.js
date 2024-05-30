import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TDO: Add SDKs for Firebase products that you want to use
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
initializeApp(firebaseConfig);
const auth = getAuth();
export default { auth }

createApp(App).use(router).mount('#app')
