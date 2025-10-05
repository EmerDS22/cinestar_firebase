import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPD9zzR8Zutuus-FlOFyFttHmUBLXVcLQ",
    authDomain: "cinestar-a7b67.firebaseapp.com",
    projectId: "cinestar-a7b67",
    storageBucket: "cinestar-a7b67.firebasestorage.app",
    messagingSenderId: "750140514881",
    appId: "1:750140514881:web:cdc1f8b56de2449f489cc0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, query, where, doc, getDoc };