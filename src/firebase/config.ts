import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';

// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBhxhNBqEl9llzqMpBafYpDU35FGGgyjwQ",
    authDomain: "ordertracking-479de.firebaseapp.com",
    projectId: "ordertracking-479de",
    storageBucket: "ordertracking-479de.firebasestorage.app",
    messagingSenderId: "748880005570",
    appId: "1:748880005570:web:18ba3cbc6e547479d7ee5b"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;