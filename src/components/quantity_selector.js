import React, { useState } from 'react';

const QuantitySelector = ({ initialQuantity = 1, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (onQuantityChange) onQuantityChange(newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (onQuantityChange) onQuantityChange(newQuantity);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px' }}>
            <button
                onClick={handleDecrement}
                style={{
                    backgroundColor: '#aaa',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                }}
                disabled={quantity <= 1}
            >
                -
            </button>
            <div style={{ padding: '5px 15px', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', textAlign: 'center' }}>
                {quantity}
            </div>
            <button
                onClick={handleIncrement}
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                }}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
