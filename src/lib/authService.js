// src/lib/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Register
export const registerUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = async () => {
  return signOut(auth);
};
