import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  // for if the user is already register 
  // import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

  // const handleEmailSignIn = async () => {
  //   try {
  //     // Attempt to log in the user
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     console.log("Signed in successfully:", userCredential.user);
  //     alert("Logged in successfully!");
  //     onClose(); // Close the modal on successful login
  //   } catch (error) {
  //     console.error("Error signing in with email and password:", error.code);
  
  //     // If the error is "user not found", offer to create a new account
  //     if (error.code === "auth/user-not-found") {
  //       const shouldSignUp = window.confirm(
  //         "No account found with this email. Would you like to create a new account?"
  //       );
  
  //       if (shouldSignUp) {
  //         handleSignUp(); // Call the sign-up handler
  //       }
  //     } else {
  //       // For other errors, show the error message
  //       alert(`Error: ${error.message}`);
  //     }
  //   }
  // };
  
  // // Sign-Up Handler for New Users
  // const handleSignUp = async () => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log("Account created successfully:", userCredential.user);
  //     alert("Account created successfully! You are now logged in.");
  //     onClose(); // Close the modal on successful sign-up
  //   } catch (error) {
  //     console.error("Error during account creation:", error.code);
  //     alert(`Error: ${error.message}`);
  //   }
  // };
  
  







  // Email and Password Sign-In Handler fir existing user 
const handleEmailSignIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in with Email and Password successfully.");
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
        <button onClick={handleEmailSignIn}>Sign In with Email</button>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
