import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Login from "./login";

const AccountPage = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const storedEmail = sessionStorage.getItem("userEmail");
      setUserEmail(storedEmail);

      // Fetch user profile and orders
      fetch(`http://127.0.0.1:8000/api/user/${storedEmail}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user profile.");
          }
          return response.json();
        })
        .then((data) => {
          setUserProfile(data.profile);
          setOrders(data.orders);

          // If navigating directly to an order details page, find and set the order
          if (orderId) {
            const order = data.orders.find((order) => order.id === parseInt(orderId, 10));
            if (order) {
              setSelectedOrder(order);
            }
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setError("Could not fetch user profile. Please try again.");
          setLoading(false);
        });
    } else {
      console.error("No access token found. User is not authenticated.");
      setLoading(false);
    }
  }, [orderId]);

  // Listen to location changes to reset `selectedOrder` when navigating back to `/account`
  useEffect(() => {
    if (location.pathname === "/account") {
      setSelectedOrder(null); // Reset the selected order
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserEmail(null);
    setUserProfile(null);
    setOrders([]);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    navigate(`/orders/${order.id}`);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    navigate("/account");
  };

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`, { state: { from: location } });
  };

  if (!userEmail) {
    return <Login onLogin={(email) => setUserEmail(email)} />;
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // Render Order Details Page
  if (selectedOrder) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <button
          onClick={handleBackToOrders}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Orders
        </button>
        <h2>Order #{selectedOrder.id} Details</h2>
        <table
          style={{
            margin: "20px auto",
            border: "1px solid black",
            width: "90%",
          }}
        >
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.order_details.map((detail) => (
              <tr key={detail.id}>
                <td>
                  <button
                    onClick={() => handleItemClick(detail.item.id)}
                    style={{
                      backgroundColor: "transparent",
                      color: "blue",
                      textDecoration: "underline",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {detail.item.name}
                  </button>
                </td>
                <td>{detail.item.category}</td>
                <td>${detail.item.price}</td>
                <td>{detail.quantity}</td>
                <td>${detail.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render Orders List
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {userEmail}!</h1>
      <div style={{ marginTop: "20px" }}>
        <h2>Orders</h2>
        {orders.length > 0 ? (
          <table
            style={{
              margin: "20px auto",
              border: "1px solid black",
              width: "90%",
            }}
          >
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Fulfillment Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => (
                <tr key={order.id}>
                  <td>
                    <button
                      onClick={() => handleOrderClick(order)}
                      style={{
                        backgroundColor: "transparent",
                        color: "blue",
                        textDecoration: "underline",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {order.id}
                    </button>
                  </td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>{order.payment_status}</td>
                  <td>{order.fulfillment_status}</td>
                  <td>${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders placed yet.</p>
        )}
      </div>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AccountPage;
