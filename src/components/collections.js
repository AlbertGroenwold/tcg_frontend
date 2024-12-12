import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CollectionsPage = () => {
    const { category } = useParams(); // Get category from route
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items from the backend based on the category
        axios
            .get(`http://127.0.0.1:8000/api/items?category=${encodeURIComponent(category)}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.error('Error fetching items:', error));
    }, [category]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Collections: {category}</h1>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No items found in this category.</p>
            )}
        </div>
    );
};

export default CollectionsPage;