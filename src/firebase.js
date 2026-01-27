import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBIKYwNFDxslwh8dq0ZwrQ5SFQXjo9BlMc",
  authDomain: "crypto-analyzer-baad0.firebaseapp.com",
  projectId: "crypto-analyzer-baad0",
  storageBucket: "crypto-analyzer-baad0.appspot.com",
  messagingSenderId: "101187798771",
  appId: "1:101187798771:web:f6e845a5c046fc81585986",
  measurementId: "G-PMG4GZ5FTJ",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure auth survives refresh/browser restart.
// (Firebase defaults are usually persistent, but this makes it explicit.)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error?.message || error);
});

// Providers for Google and GitHub
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/**
 * Function to handle Google Sign-In
 * @returns {Promise<object | null>} The signed-in user object or null in case of an error
 */
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error.message);
    return null;
  }
};

/**
 * Function to handle GitHub Sign-In
 * @returns {Promise<object | null>} The signed-in user object or null in case of an error
 */
const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error during GitHub Sign-In:", error.message);
    return null;
  }
};

/**
 * Function to handle Email Sign-Up
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<object | null>} The signed-up user object or null in case of an error
 */
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error during Sign-Up:", error.message);
    return null;
  }
};

/**
 * Function to handle Email Sign-In (existing user)
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<object | null>} The signed-in user object or null in case of an error
 */
const signInWithEmailAndPasswordHandler = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error during Sign-In:", error.message);
    return null;
  }
};

/**
 * Function to handle Sign-Out
 * @returns {Promise<void>}
 */
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during Sign-Out:", error.message);
  }
};

// Export auth and authentication functions
export {
  auth,
  signInWithGoogle,
  signInWithGitHub,
  signInWithEmailAndPasswordHandler,
  signUpWithEmailAndPassword,
  logout,
};
