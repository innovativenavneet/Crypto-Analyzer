import React, { useState } from "react";
import "./style.css";
import {
  signInWithEmailAndPasswordHandler,
  signUpWithEmailAndPassword,
  signInWithGoogle,
  signInWithGitHub,
} from "../../firebase";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();

const AuthModal = ({ onClose }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validate Email
  const isValidEmail = (email) => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate Input Before Proceeding
  const validateInputs = () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle Login with Email
  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      await signInWithEmailAndPasswordHandler(email, password);
      alert("Logged in successfully!");
      onClose(); // Close the modal only after success
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  // Handle Signup with Email for new user
  const handleSignUp = async () => {
    if (!validateInputs()) return;

    try {
      await signUpWithEmailAndPassword(email, password);
      alert("Account created successfully!");
      onClose(); // Close the modal only after success
    } catch (error) {
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Signed in with Google successfully!");
      onClose(); // Close the modal only after success
    } catch (error) {
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  // Handle GitHub Sign-In
  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      alert("Signed in with GitHub successfully!");
      onClose(); // Close the modal only after success
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
        <div style={{ position: "relative", width: "90%" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: "100%",
              paddingRight: "2.5rem", // Add space for the eye button
            }}
          />
          <button
            type="button"
            className="toggle-password-visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
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
