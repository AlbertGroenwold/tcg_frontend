import React from "react";

const AddressForm = ({ addressData, handleChange }) => (
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
        <option value="Gauteng">Gauteng</option>
        <option value="Western Cape">Western Cape</option>
        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
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

export default AddressForm;
