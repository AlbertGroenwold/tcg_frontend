import React, { useState } from "react";

const AddressManager = ({ addresses, setAddresses, token, saveAddress, deleteAddress }) => {
  const [addingAddressType, setAddingAddressType] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    province: "",
    postal_code: "",
    country: "South Africa",
  });

  const handleSaveAddress = (e) => {
    e.preventDefault();
    saveAddress(token, newAddress, addingAddressType)
      .then((address) => {
        setAddresses((prev) => [...prev, address]);
        setAddingAddressType(null);
        setNewAddress({
          address: "",
          city: "",
          province: "",
          postal_code: "",
          country: "South Africa",
        });
      })
      .catch((err) => console.error("Error saving address:", err));
  };

  const handleRemoveAddress = (id) => {
    deleteAddress(token, id)
      .then(() => setAddresses((prev) => prev.filter((addr) => addr.id !== id)))
      .catch((err) => console.error("Error deleting address:", err));
  };

  const renderAddress = (type) => {
    const address = addresses.find(
      (addr) => addr.address_type.toLowerCase() === type
    );
    if (address) {
      return (
        <div>
          <p>{`${address.address}, ${address.city}, ${address.province}, ${address.postal_code}, ${address.country}`}</p>
          <button onClick={() => handleRemoveAddress(address.id)}>Remove</button>
        </div>
      );
    }

    if (addingAddressType === type) {
      return (
        <form onSubmit={handleSaveAddress}>
          {/* Inputs for Address */}
        </form>
      );
    }

    return <button onClick={() => setAddingAddressType(type)}>Add Address</button>;
  };

  return (
    <div>
      <h3>Primary Address</h3>
      {renderAddress("primary")}
      <h3>Secondary Address</h3>
      {renderAddress("secondary")}
    </div>
  );
};

export default AddressManager;
