import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // verificam daca exista un utilizator salvat în localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Server response:', data); // Verifică ce răspuns primești
            setUser(data); // Salvează utilizatorul în starea contextului
            localStorage.setItem("user", JSON.stringify(data)); // Salvează utilizatorul în localStorage
        } catch (error) {
            console.error('Login error:', error.message);
            throw error;
        }
    };




    const logout = () => {
        setUser(null); // Reset user state
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
