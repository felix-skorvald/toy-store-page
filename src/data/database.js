import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8EnopwGNhDWKRZkfQSoMnvPkLJUYdvTI",
    authDomain: "toy-store-f53e2.firebaseapp.com",
    projectId: "toy-store-f53e2",
    storageBucket: "toy-store-f53e2.firebasestorage.app",
    messagingSenderId: "110829121472",
    appId: "1:110829121472:web:b681151bb2c1c10968a225",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
