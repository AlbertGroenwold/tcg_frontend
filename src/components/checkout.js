import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./login";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    deliveryAddress: {
      firstName: "",
      lastName: "",
      address: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
    },
    billingAddressSame: true,
    billingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      suburb: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
    },
  });

  useEffect(() => {
    // Load cart items
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    // Check if user is logged in
    const userEmail = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem("accessToken");
    if (userEmail && token) {
      setUserLoggedIn(true);
      setFormData((prevData) => ({
        ...prevData,
        email: userEmail,
      }));

      // Fetch user addresses
      fetch(`http://127.0.0.1:8000/api/user/${userEmail}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch addresses.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.addresses && data.addresses.length > 0) {
            setAddresses(data.addresses);
            setShowDeliveryForm(false); // Show saved addresses by default
          } else {
            setShowDeliveryForm(true); // No saved addresses; show delivery form
          }
        })
        .catch((error) => {
          console.error("Error fetching addresses:", error);
          setShowDeliveryForm(true); // Show form on error
        });
    } else {
      setShowDeliveryForm(true); // Show delivery form for logged-out users
    }
  }, []);

  const handleDeliveryAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      deliveryAddress: { ...formData.deliveryAddress, [name]: value },
    });
  };

  const handleAddressSelection = (e) => {
    setSelectedAddressId(parseInt(e.target.value, 10));
    setShowDeliveryForm(false); // Close delivery form
  };

  const handleUseDifferentAddress = () => {
    setSelectedAddressId(null); // Deselect any saved address
    setShowDeliveryForm(true); // Show delivery form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      billingAddress: { ...formData.billingAddress, [name]: value },
    });
  };

  const handleBillingOptionChange = (e) => {
    setFormData({
      ...formData,
      billingAddressSame: e.target.value === "same",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", {
      formData,
      selectedAddressId,
      cartItems,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderAddressForm = (addressData, handleChange) => (
    <div>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={addressData.firstName || ""}
          onChange={handleChange}
          style={{ flex: 1, padding: "10px" }}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={addressData.lastName || ""}
          onChange={handleChange}
          style={{ flex: 1, padding: "10px" }}
          required
        />
      </div>
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={addressData.address || ""}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        required
      />
      <input
        type="text"
        name="suburb"
        placeholder="Suburb"
        value={addressData.suburb || ""}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={addressData.city || ""}
          onChange={handleChange}
          style={{ flex: 1, padding: "10px" }}
          required
        />
        <select
          name="province"
          value={addressData.province || ""}
          onChange={handleChange}
          style={{ flex: 1, padding: "10px" }}
          required
        >
          <option value="">Select Province</option>
          <option value="Free State">Free State</option>
          <option value="Gauteng">Gauteng</option>
          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
          <option value="Limpopo">Limpopo</option>
          <option value="Mpumalanga">Mpumalanga</option>
          <option value="North West">North West</option>
          <option value="Northern Cape">Northern Cape</option>
          <option value="Western Cape">Western Cape</option>
          <option value="Eastern Cape">Eastern Cape</option>
        </select>
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={addressData.postalCode || ""}
          onChange={handleChange}
          style={{ flex: 1, padding: "10px" }}
          required
        />
      </div>
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={addressData.phone || ""}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />
    </div>
  );

  const handleLoginSuccess = (email) => {
    setShowLogin(false);
    setUserLoggedIn(true);
    setFormData((prevData) => ({ ...prevData, email }));
    // Fetch addresses after login
    const token = sessionStorage.getItem("accessToken");
    fetch(`http://127.0.0.1:8000/api/user/${email}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.addresses || []);
        setShowDeliveryForm(data.addresses.length === 0);
      });
  };
  
  // Place Login Modal here
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
        <Login onLogin={onLogin} />
      </div>
    </div>
  );
  
  
  
  
  

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Link to="/" style={{ fontSize: "24px", fontWeight: "bold" }}>
          MyStore Logo
        </Link>
        <button
          onClick={() => navigate("/cart")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🛒 Cart
        </button>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLoginSuccess}
        />
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        {/* Left Section */}
        <div style={{ flex: "1", maxWidth: "600px" }}>
          <form onSubmit={handleSubmit}>
          <h2>
            Contact{" "}
            {!userLoggedIn && (
              <button
              type="button" // Prevents form submission
              onClick={() => {
                setShowLogin(true);
                console.log("showLogin set to true");
              }}
            >
              Open Login
            </button>
            )}
          </h2>
          <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
  required
  readOnly={userLoggedIn} // Prevents editing if user is logged in
/>

<h2>Delivery</h2>
{userLoggedIn && addresses.length > 0 && !showDeliveryForm ? (
  <>
    <p>Select an address:</p>
    {addresses.map((address) => (
      <label key={address.id} style={{ display: "block" }}>
        <input
          type="radio"
          name="selectedAddressId"
          value={address.id}
          checked={selectedAddressId === address.id}
          onChange={handleAddressSelection}
        />
        {`${address.address}, ${address.city}, ${address.province}, ${address.postalCode}`}
      </label>
    ))}
    <button
      type="button"
      onClick={handleUseDifferentAddress}
      style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      Use a Different Address
    </button>
  </>
) : (
  renderAddressForm(formData.deliveryAddress, handleDeliveryAddressChange) // Render delivery form dynamically
)}

            <h2>Payment Details</h2>
            <h3>Billing Address</h3>
            <label>
              <input
                type="radio"
                value="same"
                checked={formData.billingAddressSame}
                onChange={handleBillingOptionChange}
              />
              Same as shipping address
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="different"
                checked={!formData.billingAddressSame}
                onChange={handleBillingOptionChange}
              />
              Use a different billing address
            </label>

            {!formData.billingAddressSame && renderAddressForm(formData.billingAddress, handleBillingAddressChange)}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Pay now
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: "0.5",
            maxWidth: "300px",
            position: "sticky",
            top: "20px",
          }}
        >
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", marginBottom: "15px" }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", marginRight: "10px" }}
              />
              <div>
                <Link
                  to={`/product/${encodeURIComponent(item.name)}`}
                  style={{ color: "black" }}
                >
                  {item.name}
                </Link>
                <p>R {item.price.toFixed(2)}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          <hr />
          <p>Subtotal: R {subtotal.toFixed(2)}</p>
          <p>Shipping: Enter shipping address</p>
          <h3>Total: R {subtotal.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
