import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Correctly named state variable

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed"); // This will trigger the catch block
        }
        return response.json();
      })
      .then((data) => {
        // Store access token and user email in session storage
        sessionStorage.setItem("accessToken", data.access);
        sessionStorage.setItem("userEmail", email);
  console.log("Access token saved:", sessionStorage.getItem("accessToken"));
        onLogin(email); // Notify parent component that login was successful
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage("Invalid email or password"); // Correctly use setErrorMessage
      });
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Login</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Show error message */}
      <button type="submit" style={{ marginTop: "10px" }}>
        Login
      </button>
    </form>
  );
};

export default Login;
