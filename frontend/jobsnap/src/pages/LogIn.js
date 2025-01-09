'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employer'); // Default to 'employer' for testing
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            // Check if the response is OK (status code 200)
            if (!response.ok) {
                const text = await response.text();  // Get the response as text
                console.error('Login failed:', text);  // Log the full response
                setErrorMessage('Failed to login');
                return;
            }

            // If the response is JSON, parse it
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const { token } = await response.json();
                if (token) {
                    // Save the token to localStorage for subsequent requests
                    localStorage.setItem('authToken', token);
                    navigate('/home'); // Redirect to home page after successful login
                } else {
                    setErrorMessage('No token received from the server.');
                }
            } else {
                setErrorMessage('Server response is not in JSON format.');
            }

        } catch (error) {
            console.error('Login error:', error);  // Log the error for further debugging
            setErrorMessage('An error occurred during login.');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to JobSnap</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="student">Student</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/signup" className="text-indigo-600">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
