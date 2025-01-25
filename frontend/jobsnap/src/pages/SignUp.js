'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
export default function SignUpPage() {
    //const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message || "Failed to sign up");
            } else {
                alert("Sign up successful!");
                // Poți redirecționa utilizatorul la pagina de login
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
                <form onSubmit={handleSignUp}>
                    {/*<div className="mb-4">*/}
                    {/*    <label className="block text-sm font-semibold mb-2" htmlFor="name">*/}
                    {/*        Name*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        id="name"*/}
                    {/*        value={name}*/}
                    {/*        onChange={(e) => setName(e.target.value)}*/}
                    {/*        className="w-full p-2 border border-gray-300 rounded"*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*</div>*/}
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
                        <label className="block text-sm font-semibold mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="student">Student</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-indigo-600">Log in</Link>
                </p>
            </div>
        </div>
    );
}
