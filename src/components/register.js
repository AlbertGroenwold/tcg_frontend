import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage(''); // Clear error message when input changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/register/', {
                email: formData.email,
                password: formData.password,
            })
            .then((response) => {
                // Handle successful registration (e.g., redirect or show a success message)
                console.log('User registered successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error details:', error);
                console.error('Error details:', error.response);
                console.error('Error details:', error.response.data);
                console.error('Error details:', error.response.data.error);
                // Check if the error is due to an existing user
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error === 'User already exists'
                ) {
                    setErrorMessage('This email is already registered.');
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.');
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ marginBottom: '5px' }}
                    />
                    {/* Display error message below email input */}
                    {errorMessage && <p style={{ color: 'red', margin: '5px 0' }}>{errorMessage}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
