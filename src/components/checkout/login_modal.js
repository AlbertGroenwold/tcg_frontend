import React from "react";
import Login from "../login";

const LoginModal = ({ onClose, onLogin }) => (
  <div
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
        position: "relative",
        width: "400px",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
      <Login onLogin={(email, token) => onLogin(email, token)} />
    </div>
  </div>
);

export default LoginModal;
