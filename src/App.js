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
import ConfirmationScreen from "./components/confirmation";
import AboutUs from "./components/aboutUs";
import ContactUs from "./components/contactus";
import TermsOfService from "./components/termsofservice";
import ShippingPolicy from "./components/shippingpolicy";
import PrivacyPolicy from "./components/privacypolicy";
import ReturnPolicy from "./components/returnpolicy";
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

  const isMinimalLayout =
  location.pathname === "/checkout" || location.pathname.startsWith("/confirm/order/");

  return (
    <div className="app-container">
      {!isMinimalLayout && <Header />}
      <div className="main-content" style={{ display: "flex" }}>
        {!isMinimalLayout && <Sidebar categories={categories} />}
        <div className="content" style={{ flex: 1 }}>{children}</div>
      </div>
      {!isMinimalLayout && <Footer />}
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
          <Route path="/confirm/order/:orderId" element={<ConfirmationScreen />} />
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/termsofservice" element={<TermsOfService/>}/>
          <Route path="/shippingpolicy" element={<ShippingPolicy/>}/>
          <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
          <Route path="/returnpolicy" element={<ReturnPolicy/>}/>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
