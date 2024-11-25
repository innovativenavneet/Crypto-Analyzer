import React, { useState } from "react";
import "./style.css"; // Include the CSS file
import {
  auth,
  signInWithEmailAndPasswordHandler,
  signUpWithEmailAndPassword,
  signInWithGoogle,
  signInWithGitHub,
} from "../../firebase";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthModal = ({ onClose }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login with Email
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPasswordHandler(email, password);
      alert("Logged in successfully!");
      onClose();
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  // Handle Signup with Email for new user
  const handleSignUp = async () => {
    try {
      await signUpWithEmailAndPassword(email, password);
      alert("Account created successfully!");
      onClose(); // Close the modal
    } catch (error) {
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Signed in with Google successfully!");
      onClose(); // Close the modal
    } catch (error) {
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  // Handle GitHub Sign-In
  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      alert("Signed in with GitHub successfully!");
      onClose(); // Close the modal
    } catch (error) {
      alert(`GitHub Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2 className="Header1">{isSignUpMode ? "Sign Up" : "Log In"}</h2>
        <p className="Header2">Welcome to CryptoAnalyzer.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="action-button"
          onClick={isSignUpMode ? handleSignUp : handleLogin}
        >
          {isSignUpMode ? "SIGN UP" : "LOGIN"}
        </button>
        {!isSignUpMode && (
          <a className="forgot-password" href="/forgot-password">
            Forgot your password? Get help
          </a>
        )}
        <p className="toggle-mode">
          {isSignUpMode ? "Already a member?" : "Not a member?"}{" "}
          <span onClick={() => setIsSignUpMode(!isSignUpMode)}>
            {isSignUpMode ? "Log In" : "Sign Up"}
          </span>
        </p>
        <hr />
        <button className="social-login google-login" onClick={handleGoogleSignIn}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
          />
          Sign in with Google
        </button>
        <button className="social-login github-login" onClick={handleGitHubSignIn}>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
