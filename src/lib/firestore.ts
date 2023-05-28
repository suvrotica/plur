import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQEKc-VP-8KYWaus_FZyjqeuudd-dHIVw",
    authDomain: "plur-48a5a.firebaseapp.com",
    projectId: "plur-48a5a",
    storageBucket: "plur-48a5a.appspot.com",
    messagingSenderId: "802891493884",
    appId: "1:802891493884:web:e4a3f32005f282e5bd4279",
    measurementId: "G-QWB9542WVK"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };

