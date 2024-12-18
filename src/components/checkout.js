import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./checkout/login_modal";
import AddressForm from "./checkout/address_form";
import OrderSummary from "./checkout/order_summary";
import ConfirmationScreen from "./confirmation";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

    const userEmail = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem("accessToken");

    if (userEmail && token) {
      setUserLoggedIn(true);
      setFormData((prevData) => ({ ...prevData, email: userEmail }));
      fetchAddresses(userEmail, token);
    }
  }, []);

  const fetchAddresses = (email, token) => {
    fetch(`http://127.0.0.1:8000/api/user/${email}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch addresses (Status: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.addresses?.length) {
          setAddresses(data.addresses);
          setSelectedAddressId(data.addresses[0].id);
  
          const firstAddress = data.addresses[0];
          setFormData((prevData) => ({
            ...prevData,
            deliveryAddress: {
              address: firstAddress.address || "",
              city: firstAddress.city || "",
              province: firstAddress.province || "",
              postalCode: firstAddress.postal_code || "",
              phone: firstAddress.phone || "",
              firstName: prevData.deliveryAddress.firstName || "",
              lastName: prevData.deliveryAddress.lastName || "",
            },
          }));
          setShowDeliveryForm(false);
        } else {
          setShowDeliveryForm(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error.message);
        alert("Failed to fetch addresses. Please try again.");
      });
  };
  

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem("accessToken");
  
    // Validate delivery address
    const { address, city, province, postalCode } = formData.deliveryAddress;
    if (!address || !city || !province || !postalCode) {
      alert("Please complete the delivery address before proceeding.");
      return;
    }
  
    const orderData = {
      cart_items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      delivery_address: formData.deliveryAddress,
      billing_address: formData.billingAddressSame
        ? formData.deliveryAddress
        : formData.billingAddress,
      subtotal,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/create-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
  
      const data = await response.json();
      const orderId = data.order_id;
  
      // Navigate to confirmation screen with ORDERID
      navigate(`/confirm/order/${orderId}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred while processing your order.");
    }
  };
  
  const handleLogout = () => {
    // Clear sessionStorage to log the user out
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userEmail");
  
    // Reset state for logged-out users
    setUserLoggedIn(false);
    setFormData((prevData) => ({
      ...prevData,
      email: "", // Clear the email field
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
    }));
  
    setAddresses([]); // Clear saved addresses
    setSelectedAddressId(null);
    setShowDeliveryForm(true); // Show delivery form for guest
    console.log("User logged out, continuing as guest.");
  };
  
  

  const handleUseDifferentAddress = () => {
    setSelectedAddressId(null);
    setShowDeliveryForm(true);
  };

  const handleAddressSelection = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedAddressId(selectedId);
  
    // Find the selected address
    const selectedAddress = addresses.find((address) => address.id === selectedId);
  
    // Populate the formData.deliveryAddress with the selected address
    setFormData((prevData) => ({
      ...prevData,
      deliveryAddress: {
        address: selectedAddress.address || "",
        suburb: selectedAddress.suburb || "",
        city: selectedAddress.city || "",
        province: selectedAddress.province || "",
        postalCode: selectedAddress.postal_code || "",
        phone: selectedAddress.phone || "",
        firstName: prevData.deliveryAddress.firstName || "", // Use previously input firstName
        lastName: prevData.deliveryAddress.lastName || "", // Use previously input lastName
      },
    }));
  
    setShowDeliveryForm(false);
  };
  

  if (showConfirmation) {
    return (
      <ConfirmationScreen
        formData={formData}
        cartItems={cartItems}
        subtotal={subtotal}
      />
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "bold" }}>MyStore Logo</Link>
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
          onLogin={(email, token) => {
            setUserLoggedIn(true);
            setFormData((prevData) => ({ ...prevData, email }));
            fetchAddresses(email, token); // Fetch addresses using the valid token
            setShowLogin(false); // Close the modal
          }}
        />
        )}


      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        {/* Left Section */}
        <div style={{ flex: "1", maxWidth: "600px" }}>
          <form onSubmit={handleSubmit}>
            {/* Contact */}
            <h2>
  Contact{" "}
  {userLoggedIn ? (
    // If the user is logged in, show "Continue as Guest" button
    <button
      type="button"
      onClick={handleLogout} // Call the logout handler
      style={{
        marginLeft: "10px",
        cursor: "pointer",
        color: "red", // Optional: Make the text red to differentiate
        background: "none",
        border: "none",
      }}
    >
      Continue as Guest
    </button>
  ) : (
    // If not logged in, show the "Login" button
    <button
      type="button"
      onClick={() => setShowLogin(true)} // Open the login modal
      style={{ marginLeft: "10px", cursor: "pointer" }}
    >
      Login
    </button>
  )}
</h2>

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              readOnly={userLoggedIn}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              required
            />

            {/* Delivery */}
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
                    {`${address.address}, ${address.city}, ${address.province}, ${address.postal_code}`}
                  </label>
                ))}
                <button
                  type="button"
                  onClick={handleUseDifferentAddress}
                  style={{ marginTop: "10px", padding: "10px", backgroundColor: "black", color: "white" }}
                >
                  Use a Different Address
                </button>
              </>
            ) : (
              <AddressForm
                addressData={formData.deliveryAddress}
                handleChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({
                    ...formData,
                    deliveryAddress: { ...formData.deliveryAddress, [name]: value },
                  });
                }}
              />
            )}

            {/* Billing */}
            <h2>Billing Address</h2>
            <label>
              <input
                type="radio"
                value="same"
                checked={formData.billingAddressSame}
                onChange={() => setFormData({ ...formData, billingAddressSame: true })}
              />
              Same as delivery address
            </label>
            <label>
              <input
                type="radio"
                value="different"
                checked={!formData.billingAddressSame}
                onChange={() => setFormData({ ...formData, billingAddressSame: false })}
              />
              Use a different billing address
            </label>

            {!formData.billingAddressSame && (
              <AddressForm
                addressData={formData.billingAddress}
                handleChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({
                    ...formData,
                    billingAddress: { ...formData.billingAddress, [name]: value },
                  });
                }}
              />
            )}

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
              Pay Now
            </button>
          </form>
        </div>

        {/* Right Section */}
        <OrderSummary cartItems={cartItems} subtotal={subtotal} />
      </div>
    </div>
  );
};

export default CheckoutPage;
