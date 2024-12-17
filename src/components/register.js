import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); // Clear error message when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        // Handle successful registration
        console.log("User registered successfully:", response.data);
        alert("Registration successful! You can now log in.");
        navigate("/account"); // Redirect to login form after successful registration
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error === "User already exists"
        ) {
          setErrorMessage("This email is already registered.");
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Register</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          style={{
            marginBottom: "10px",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Register
      </button>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account?{" "}
        <button
          style={{
            backgroundColor: "transparent",
            color: "blue",
            textDecoration: "underline",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/account")}
        >
          Log in here
        </button>
      </p>
    </form>
  );
};

export default RegisterPage;
