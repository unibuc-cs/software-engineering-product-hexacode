// src/pages/CVSelectionPage.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function CVSelectionPage() {
    const cvTypes = [
        { name: 'IT/Software Development', path: '/create-cv/it', description: 'Create a tech-focused CV for software development roles.' },
        { name: 'Business/Economics', path: '/create-cv/business', description: 'Tailor your CV for business and economic positions.' },
        { name: 'Marketing', path: '/create-cv/marketing', description: 'Build a CV that highlights your marketing expertise.' },
        { name: 'Graphic Design', path: '/create-cv/graphicdesign', description: 'Showcase your creativity with a design-specific CV.' },
        { name: 'Healthcare', path: '/create-cv/healthcare', description: 'Craft a CV for healthcare professionals and providers.' },
        { name: 'Education (Teacher)', path: '/create-cv/education', description: 'Design your CV for teaching and educational roles.' },
    ];

    return (
        <div className="min-h-screen py-32 bg-gradient-to-r from-white to-blue-500  flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold text-white mb-12 text-center">Select Your CV Type</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                {cvTypes.map((cv, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
                        <Link to={cv.path} className="block p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{cv.name}</h2>
                            <p className="text-gray-600 mb-6">{cv.description}</p>
                            <button className="text-white bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                                Create CV
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
