export const fetchUserData = (email, token) => {
    return fetch(`http://127.0.0.1:8000/api/user/${email}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user data.");
      return res.json();
    });
  };
  
  export const deleteAddress = (token, id) => {
    return fetch(`http://127.0.0.1:8000/api/address/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to delete address.");
    });
  };
  
  export const saveAddress = (token, address, type) => {
    return fetch("http://127.0.0.1:8000/api/address/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...address, address_type: type }),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to save address.");
      return res.json();
    });
  };
  