import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]); // State to store cart items
  const navigate = useNavigate();

  // Fetch cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart); // Initialize cart with stored data
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Remove item from cart
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Update the quantity of the item in the cart
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    // Navigate back to the product listing page (adjust the route as needed)
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Your cart is empty.</p>
        <button
          onClick={handleContinueShopping}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "20px 0",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Image</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Quantity
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Total</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button
                  onClick={() => navigate(`/product/${encodeURIComponent(item.name)}`)} // Navigate to the product detail page
                  style={{
                    backgroundColor: "transparent",
                    color: "blue",
                    textDecoration: "underline",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                </button>
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                ${item.price}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  style={{ width: "60px" }}
                />
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                ${item.price * item.quantity}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleContinueShopping}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
        <button
          onClick={handleCheckout}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
