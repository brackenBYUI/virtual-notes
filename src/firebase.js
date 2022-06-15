import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  orderBy,
  limit,
  onSnapshot,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAE6ET_0SeUY_qJXl-7yIksqs_pp9MWLWs",
  authDomain: "virtual-notes-56394.firebaseapp.com",
  projectId: "virtual-notes-56394",
  storageBucket: "virtual-notes-56394.appspot.com",
  messagingSenderId: "882486106132",
  appId: "1:882486106132:web:94ab6957d497136998af01",
  measurementId: "G-XG8B3X9TRB",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

export {
  db,
  setDoc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  auth,
  orderBy,
  limit,
  onSnapshot,
  query,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  where,
};
