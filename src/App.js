import React from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <Sidebar />
                <div className="content">
                    <h2>Welcome to the Store</h2>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
