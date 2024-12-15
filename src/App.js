import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import CollectionsPage from './components/collections'; // Import the CollectionsPage
import ProductDetailPage from './components/product';
import AccountPage from './components/account';
import RegisterPage from './components/register';
import SearchResultsPage from './components/search_results';
import CartPage from './components/cart';
import ParentComponent from './components/parent'; // Import ParentComponent

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <div className="main-content">
                    <ParentComponent /> {/* Use ParentComponent instead of Sidebar */}
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<h2>Welcome to the Store</h2>} />
                            <Route path="/collections/:category" element={<CollectionsPage />} />
                            <Route path="/collections/:parent/:category" element={<CollectionsPage />} />
                            <Route path="/product/:name" element={<ProductDetailPage />} />
                            <Route path="/account" element={<AccountPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/orders/:orderId" element={<AccountPage />} />
                            <Route path="/results" element={<SearchResultsPage />} />
                            <Route path="/cart" element={<CartPage />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
