import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CollectionsPage = () => {
    const { category, parent } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
    
                // Send category or parent as a single query parameter
                const query = `category=${encodeURIComponent(parent || category)}`;
                const response = await axios.get(`http://127.0.0.1:8000/api/items?${query}`);
    
                setItems(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Handle "Category not found" specifically
                    console.warn("Category not found:", error.response.data.error);
                    setItems([]); // Set empty items to trigger "No items matched" message
                } else {
                    console.error('Error fetching items:', error.response || error.message);
                    setError('Failed to fetch items. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchItems();
    }, [category, parent]);
    

    if (loading) {
        return <p>Loading items...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>
                Collections: {parent ? `${parent} > ${category}` : category}
            </h1>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <Link to={`/product/${encodeURIComponent(item.name)}`}>
                                {item.name} - ${item.price}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items found in this category.</p>
            )}
        </div>
    );
};

export default CollectionsPage;
