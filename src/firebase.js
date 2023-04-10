// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1FqQBcEh-M6JdOO_it7LEV0XkTDZ8COA",
  authDomain: "instagram-reels-clone-1ffe8.firebaseapp.com",
  projectId: "instagram-reels-clone-1ffe8",
  storageBucket: "instagram-reels-clone-1ffe8.appspot.com",
  messagingSenderId: "131325955514",
  appId: "1:131325955514:web:a6318c5b2473c42c222183",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
const firestore = firebase.firestore();

export const database = {
  users: firestore.collection("users"),
  posts: firestore.collection("posts"),
  comments: firestore.collection("comments"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
