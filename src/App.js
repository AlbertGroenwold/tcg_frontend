import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import CollectionsPage from './components/collections'; // Import the CollectionsPage
import ProductDetailPage from './components/product';
import AccountPage from './components/account';
import RegisterPage from './components/register';
import SearchResultsPage from './components/search_results';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <div className="main-content">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<h2>Welcome to the Store</h2>} />
                            <Route path="/collections/:category" element={<CollectionsPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/account" element={<AccountPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/orders/:orderId" element={<AccountPage />} />
                            <Route path="/results" element={<SearchResultsPage />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
