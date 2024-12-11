import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/items/')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <aside>
            <nav>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;