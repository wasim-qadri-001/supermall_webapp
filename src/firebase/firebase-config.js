// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0LcTrTGPzDjR4WI4iIKjhxXcC8ugfGW8",
  authDomain: "supermall-webapp-12ad5.firebaseapp.com",
  projectId: "supermall-webapp-12ad5",
  storageBucket: "supermall-webapp-12ad5.firebasestorage.app",
  messagingSenderId: "281411344748",
  appId: "1:281411344748:web:ce23c84c710c7a58363b49",
  measurementId: "G-QLMN69T00C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
