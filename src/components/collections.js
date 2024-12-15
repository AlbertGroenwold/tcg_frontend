import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CollectionsPage = () => {
    const { category, parent } = useParams(); // Get both category and parent from route parameters
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                
                // Construct the query parameter based on whether the parent exists
                const query = parent
                    ? `category=${encodeURIComponent(parent)}/${encodeURIComponent(category)}`
                    : `category=${encodeURIComponent(category)}`;

                // Fetch items from the API
                const response = await axios.get(`http://127.0.0.1:8000/api/items?${query}`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Failed to fetch items. Please try again.');
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
                            {/* Link to the product detail page */}
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
