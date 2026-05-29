import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // ADMIN EMAIL
  // =========================

  const ADMIN_EMAIL =
    "yasmeenarifa17@gmail.com";

  // =========================
  // AUTH LISTENER
  // =========================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {

          if (currentUser) {

            const userRef =
              doc(
                db,
                "users",
                currentUser.uid
              );

            const userSnap =
              await getDoc(userRef);

            if (userSnap.exists()) {

              setUser(userSnap.data());

            } else {

              const role =
                currentUser.email ===
                ADMIN_EMAIL
                  ? "admin"
                  : "user";

              const newUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                role,
                bio: "",
                image: "",
                createdAt:
                  new Date().toISOString(),
              };

              await setDoc(
                userRef,
                newUser
              );

              setUser(newUser);
            }

          } else {

            setUser(null);
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  // =========================
  // REGISTER
  // =========================

  const register = async (
    email,
    password
  ) => {

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const firebaseUser =
      result.user;

    const role =
      email === ADMIN_EMAIL
        ? "admin"
        : "user";

    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role,
      bio: "",
      image: "",
      createdAt:
        new Date().toISOString(),
    };

    await setDoc(
      doc(
        db,
        "users",
        firebaseUser.uid
      ),
      userData
    );

    setUser(userData);

    return firebaseUser;
  };

  // =========================
  // LOGIN
  // =========================

  const login = async (
    email,
    password
  ) => {

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const firebaseUser =
      result.user;

    const userDoc =
      await getDoc(
        doc(
          db,
          "users",
          firebaseUser.uid
        )
      );

    if (userDoc.exists()) {

      setUser(userDoc.data());
    }

    return firebaseUser;
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {

    await signOut(auth);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >

      {!loading && children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;