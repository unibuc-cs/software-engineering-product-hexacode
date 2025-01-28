'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';
import { useAuth } from '../context/AuthContext'; // Importăm contextul de autentificare
import React from 'react';

const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth(); // Accesăm datele utilizatorului și funcția de logout din context
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Call the logout function
        navigate('/home'); // Redirect to the home page after logging out
    };
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt="Company logo"
                            src={icon}
                            className="w-11 h-11"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="text-sm/6 font-semibold text-gray-900 hover:underline">
                                Welcome, {user.name || 'User'}!
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-sm/6 font-semibold text-red-600 hover:text-red-800"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt="Company logo"
                                src={icon}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {user ? (
                                    <div className="space-y-4">
                                        <span className="block text-sm/6 font-semibold text-gray-900">
                                            Welcome, {user.name || 'User'}!
                                        </span>
                                        <button
                                            onClick={logout}
                                            className="block w-full rounded-lg bg-red-600 px-3 py-2 text-center text-sm/6 font-semibold text-white hover:bg-red-700"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
