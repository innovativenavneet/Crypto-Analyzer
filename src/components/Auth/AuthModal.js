import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email and Password Sign-In Handler fir existing user 
const handleEmailSignIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onClose(); // Close the modal on successful login
  } catch (error) {
    // Log the specific error message for debugging
    console.error("Error signing in with email and password:", error.message);

    // Show the error message to the user using alert
    alert(`Error: ${error.message}`);
  }
};

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle(); // Use the utility function
      if (user) {
        console.log("Google Sign-In successful.");
        onClose(); // Close the modal on successful login
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <h2>Sign In</h2>
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {/* Sign-In Buttons */}
        <button onClick={handleEmailSignIn}>Log In with Email</button>
        <button onClick={handleGoogleSignIn}>Log In with Google</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
