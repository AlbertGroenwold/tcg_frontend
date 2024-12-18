import React from "react";

const OrdersManager = ({ orders, selectedOrder, setSelectedOrder }) => {
  if (selectedOrder) {
    return (
      <div>
        {/* Render selected order details */}
      </div>
    );
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.length > 0 ? (
        <table>
          {/* Render orders list */}
        </table>
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
};

export default OrdersManager;
