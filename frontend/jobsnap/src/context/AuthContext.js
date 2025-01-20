import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        console.log('Login credentials:', credentials); // Add this line to debug the credentials being sent
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Server response:', data); // Log the server response
            setUser(data); // Save user data in context
        } catch (error) {
            console.error('Login error:', error.message);
            throw error;
        }
    };


    const logout = () => {
        setUser(null); // Reset user state
        localStorage.removeItem('authToken'); // Remove token from localStorage
        localStorage.removeItem('role'); // Optionally remove the role
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
