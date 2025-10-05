import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,     
    sendPasswordResetEmail,         
    updatePassword,                 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAPD9zzR8Zutuus-FlOFyFttHmUBLXVcLQ",
    authDomain: "cinestar-a7b67.firebaseapp.com",
    projectId: "cinestar-a7b67",
    storageBucket: "cinestar-a7b67.firebasestorage.app",
    messagingSenderId: "750140514881",
    appId: "1:750140514881:web:cdc1f8b56de2449f489cc0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { 
    auth, 
    googleProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    updatePassword,
    onAuthStateChanged 
};