import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
    console.log("Google Sign-In successful. User info:", user);
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
    console.log("GitHub Sign-In successful. User info:", user);
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
    console.log("Sign-Up successful. User info:", user);
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
    console.log("Sign-In successful. User info:", user);
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
    console.log("User successfully signed out.");
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
