import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Get name from the URL
import axios from 'axios';
import QuantitySelector from './quantity_selector';

const ProductDetailPage = () => {
    const { name: itemName } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        // Fetch product details from the backend
        axios
            .get(`http://127.0.0.1:8000/api/items/${encodeURIComponent(itemName)}/`) // Use `name` in the URL
            .then((response) => setProduct(response.data))
            .catch((error) => console.error('Error fetching product details:', error));
    }, [itemName]);

    if (!product) {
        console.error(itemName)
        return <p>Loading product details...</p>;
    }

    const handleQuantityChange = (quantity) => {
        setSelectedQuantity(quantity);
        console.log(`Selected quantity: ${quantity}`); // Debugging purpose
    }

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product exists, update the quantity
            cart[existingProductIndex].quantity += selectedQuantity;
        } else {
            // If the product does not exist, add it to the cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: selectedQuantity,
            });
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Added ${selectedQuantity} of ${product.name} to the cart.`);
        alert(`${selectedQuantity} of ${product.name} has been added to the cart.`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{product.name}</h1>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Release Date:</strong> {product.release_date}</p>
            <p><strong>Contains:</strong> {product.contains}</p>
            <QuantitySelector initialQuantity={1} onQuantityChange={handleQuantityChange} />
            <button
                onClick={handleAddToCart}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Add to Cart
            </button>
            {product.image && (
                <img 
                    src={product.image} // Use the absolute URL directly
                    alt={product.name} 
                    style={{ maxWidth: '300px' }} 
                />
            )}
        </div>
    );
};

export default ProductDetailPage;
