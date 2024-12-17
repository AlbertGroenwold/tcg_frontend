import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginModal from "./checkout/login_modal"; // Reuse your existing Login Modal component

const ConfirmationScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      // If no token, show login modal
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    fetchOrderDetails(token);
  }, [orderId]);

  const fetchOrderDetails = (token) => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Order not found or unauthorized.");
        return response.json();
      })
      .then((data) => {
        setOrderDetails(data);
        clearCart(); // Clear cart after successful order fetch
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleLoginSuccess = (email, token) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("userEmail", email);
    setShowLoginModal(false);
    fetchOrderDetails(token);
  };

  // Clear the cart from localStorage
  const clearCart = () => {
    localStorage.removeItem("cart");
    console.log("Cart has been cleared.");
  };

  if (loading) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading order details...</p>;
  }

  if (showLoginModal) {
    return (
      <LoginModal
        onClose={() => navigate("/")}
        onLogin={(email, token) => handleLoginSuccess(email, token)}
      />
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!orderDetails || !orderDetails.items) {
    return <p style={{ textAlign: "center" }}>No order details found. Please try again.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order Confirmation</h1>
      <div style={styles.section}>
        <h2 style={styles.subTitle}>Order Information</h2>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Order Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
        <p><strong>Payment Status:</strong> {orderDetails.payment_status}</p>
        <p><strong>Fulfillment Status:</strong> {orderDetails.fulfillment_status}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>Delivery Address</h2>
        <p>{orderDetails.address}</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>Items Ordered</h2>
        {orderDetails.items.map((item, index) => (
          <p key={index}>
            {item.name} - Qty: {item.quantity} - Price: R {item.price.toFixed(2)}
          </p>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.subTitle}>Total Amount</h2>
        <p><strong>R {parseFloat(orderDetails.total).toFixed(2)}</strong></p>
      </div>

      <button style={styles.button} onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" },
  title: { textAlign: "center", marginBottom: "20px" },
  subTitle: { fontSize: "18px", marginBottom: "10px" },
  section: { marginBottom: "20px" },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ConfirmationScreen;
