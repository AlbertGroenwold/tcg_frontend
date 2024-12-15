import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import axios from "axios";

const ParentComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories/hierarchy/") // Adjust endpoint to match your backend
      .then((response) => {
        console.log("Fetched Categories:", response.data); // Log the full data
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return <Sidebar categories={categories} />;
};

export default ParentComponent;
