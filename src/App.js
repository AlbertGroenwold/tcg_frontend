import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import CollectionsPage from "./components/collections";
import ProductDetailPage from "./components/product";
import AccountPage from "./components/account";
import RegisterPage from "./components/register";
import SearchResultsPage from "./components/search_results";
import CartPage from "./components/cart";
import CheckoutPage from "./components/checkout";
import axios from "axios";
import { useEffect, useState } from "react";

// Layout Component: Handles Header, Sidebar, and Footer visibility
const Layout = ({ children }) => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  // Fetch categories when the layout loads
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((response) => {
        console.log("Fetched Categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className="app-container">
      {!isCheckoutPage && <Header />}
      <div className="main-content" style={{ display: "flex" }}>
        {!isCheckoutPage && <Sidebar categories={categories} />}
        <div className="content" style={{ flex: 1 }}>{children}</div>
      </div>
      {!isCheckoutPage && <Footer />}
    </div>
  );
};

// App Component: Wraps Routes inside Layout
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Store</h2>} />
          <Route path="/collections/:category" element={<CollectionsPage />} />
          <Route path="/collections/:parent/:category" element={<CollectionsPage />} />
          <Route path="/product/:name" element={<ProductDetailPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/results" element={<SearchResultsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
