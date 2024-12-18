import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Login from "./login";

const AccountPage = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addingAddressType, setAddingAddressType] = useState(null); // Tracks if adding address
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    province: "",
    postal_code: "",
    country: "South Africa",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      const storedEmail = sessionStorage.getItem("userEmail");
      setUserEmail(storedEmail);

      // Fetch user data from the API
      fetch(`http://127.0.0.1:8000/api/user/${storedEmail}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data.");
          }
          return response.json();
        })
        .then((data) => {
          setAddresses(data.addresses || []);
          setOrders(data.orders || []);

          // Select the order if navigating directly to an order details page
          if (orderId) {
            const order = data.orders.find(
              (order) => order.id === parseInt(orderId, 10)
            );
            if (order) {
              setSelectedOrder(order);
            }
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Could not fetch user data. Please try again.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (location.pathname === "/account") {
      setSelectedOrder(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserEmail(null);
    setAddresses([]);
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

  const handleAddAddress = (type) => {
    setAddingAddressType(type);
  };

  const handleRemoveAddress = (id) => {
    fetch(`http://127.0.0.1:8000/api/address/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete address.");
        }
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
        setError("Could not delete the address. Please try again.");
      });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/address/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newAddress,
        address_type: addingAddressType,
        email: userEmail,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save address.");
        }
        return response.json();
      })
      .then((data) => {
        setAddresses((prev) => [...prev, data]);
        setAddingAddressType(null);
        setNewAddress({
          address: "",
          city: "",
          province: "",
          postal_code: "",
          country: "South Africa",
        });
      })
      .catch((error) => {
        console.error("Error saving address:", error);
        setError("Could not save the address. Please try again.");
      });
  };

  const handleChangeNewAddress = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const renderAddress = (type) => {
    const address = addresses.find(
      (addr) => addr.address_type.toLowerCase() === type
    );

    if (address) {
      return (
        <div>
          <p>
            {address.address}, {address.city}, {address.province},{" "}
            {address.postal_code}, {address.country}
          </p>
          <button onClick={() => handleRemoveAddress(address.id)}>Remove</button>
        </div>
      );
    }

    if (addingAddressType === type) {
      return (
        <form onSubmit={handleSaveAddress} style={{ marginTop: "10px" }}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newAddress.address}
            onChange={handleChangeNewAddress}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newAddress.city}
            onChange={handleChangeNewAddress}
            required
          />
          <select
            name="province"
            value={newAddress.province}
            onChange={handleChangeNewAddress}
            required
          >
            <option value="">Select Province</option>
            <option value="Eastern Cape">Eastern Cape</option>
            <option value="Free State">Free State</option>
            <option value="Gauteng">Gauteng</option>
            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
            <option value="Limpopo">Limpopo</option>
            <option value="Mpumalanga">Mpumalanga</option>
            <option value="North West">North West</option>
            <option value="Northern Cape">Northern Cape</option>
            <option value="Western Cape">Western Cape</option>
          </select>
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={newAddress.postal_code}
            onChange={handleChangeNewAddress}
            required
          />
          <button type="submit">Save</button>
        </form>
      );
    }

    return <button onClick={() => handleAddAddress(type)}>Add Address</button>;
  };

  if (!userEmail) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Login onLogin={(email) => setUserEmail(email)} />
        <p style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <button
            style={{
              backgroundColor: "transparent",
              color: "blue",
              textDecoration: "underline",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Sign up here
          </button>
        </p>
      </div>
    );
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
        <table style={{ margin: "20px auto", border: "1px solid black", width: "90%" }}>
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
                    onClick={() => handleItemClick(detail.item.name)}
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
                <td>{detail.item.categories.map((cat) => cat.name).join(", ")}</td>
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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {userEmail}!</h1>
      <h3>Primary Address</h3>
      {renderAddress("primary")}

      <h3>Secondary Address</h3>
      {renderAddress("secondary")}

      <h2>Orders</h2>
      {orders.length > 0 ? (
        <table style={{ margin: "20px auto", border: "1px solid black", width: "90%" }}>
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
            {orders.map((order) => (
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
