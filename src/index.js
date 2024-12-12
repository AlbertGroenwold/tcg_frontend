import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new `react-dom/client` module
import App from './App';
import './styles.css';
import './styles/header.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
