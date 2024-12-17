import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({ cartItems, subtotal }) => (
  <div style={{ flex: "0.5", maxWidth: "300px", position: "sticky", top: "20px" }}>
    <h2>Order Summary</h2>
    {cartItems.map((item) => (
      <div key={item.id} style={{ display: "flex", marginBottom: "15px" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "80px", height: "80px", marginRight: "10px" }}
        />
        <div>
          <Link to={`/product/${encodeURIComponent(item.name)}`} style={{ color: "black" }}>
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
);

export default OrderSummary;
