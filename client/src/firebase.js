import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbuhHe7B8cs-XIfBAp7pwhUoO_-Lp7Ouk",
  authDomain: "blogsphere-deb60.firebaseapp.com",
  projectId: "blogsphere-deb60",
  storageBucket: "blogsphere-deb60.firebasestorage.app",
  messagingSenderId: "121344282703",
  appId: "1:121344282703:web:bf0dc1a03acd1f0edada3a"
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);