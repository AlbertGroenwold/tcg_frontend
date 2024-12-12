import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products.json'; // Import JSON data

const Sidebar = () => {
    const [expanded, setExpanded] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [panePosition, setPanePosition] = useState({ top: 0, left: 0 });
    const [isHoveringPane, setIsHoveringPane] = useState(false);

    const navigate = useNavigate();

    const toggleExpand = (item) => {
        if (expanded.includes(item)) {
            setExpanded((prev) => prev.filter((i) => !i.startsWith(item)));
        } else {
            setExpanded((prev) => [...prev.filter((i) => !i.startsWith(item)), item]);
        }
    };

    const handleMouseEnter = (item, event) => {
        const rect = event.target.getBoundingClientRect();
        const sidebarRect = event.target.closest('aside').getBoundingClientRect();
        setPanePosition({
            top: rect.top - sidebarRect.top,
            left: rect.right - sidebarRect.left - 20,
        });
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        if (!isHoveringPane) {
            setHoveredItem(null);
        }
    };

    const handleClickInPane = (item) => {
        // Navigate to the collections page with the selected category
        navigate(`/collections/${item}`);
    };

    const renderItems = (data, level = 0, parent = '') => {
        return (
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {Object.keys(data).map((key) => {
                    const fullPath = parent ? `${parent}.${key}` : key;
                    if (Array.isArray(data[key])) {
                        return (
                            <li
                                key={key}
                                className={`level-${level}`}
                                onMouseEnter={(event) =>
                                    handleMouseEnter({ title: key, items: data[key] }, event)
                                }
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: 'pointer' }}
                            >
                                {key}
                            </li>
                        );
                    } else if (typeof data[key] === 'object') {
                        return (
                            <li key={key} className={`level-${level}`}>
                                <span
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: level === 0 ? 'bold' : 'normal',
                                    }}
                                    onClick={() => toggleExpand(fullPath)}
                                >
                                    {key}
                                </span>
                                {expanded.includes(fullPath) && (
                                    <div style={{ marginLeft: '20px' }}>{renderItems(data[key], level + 1, fullPath)}</div>
                                )}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        );
    };

    return (
        <aside style={{ position: 'relative', width: '200px', background: '#f4f4f4', padding: '10px' }}>
            <nav>{renderItems(products)}</nav>
            {hoveredItem && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${panePosition.top}px`,
                        left: `${panePosition.left}px`,
                        backgroundColor: '#f4f4f4',
                        padding: '10px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        zIndex: 100,
                    }}
                    onMouseEnter={() => setIsHoveringPane(true)}
                    onMouseLeave={() => {
                        setIsHoveringPane(false);
                        setHoveredItem(null);
                    }}
                >
                    <h4>{hoveredItem.title}</h4>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {hoveredItem.items.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleClickInPane(item)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'blue',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
