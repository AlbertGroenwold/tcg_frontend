import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import CollectionsPage from './components/collections'; // Import the CollectionsPage
import ProductDetailPage from './components/product';

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
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
