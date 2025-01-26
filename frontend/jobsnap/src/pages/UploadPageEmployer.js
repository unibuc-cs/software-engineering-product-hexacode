import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadCVStudent = () => {
    const { user } = useAuth();
    const [cvList, setCvList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'employer') {
            return;
        }

        const fetchAllCVs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cv/allcvs'); // Endpoint pentru a obține toate CV-urile
                if (!response.ok) {
                    throw new Error('Error fetching CVs');
                }
                const data = await response.json();
                console.log("All CVs:", data); // Verifică ce date primești
                setCvList(data);
            } catch (error) {
                console.error("Error fetching CVs:", error);
                alert('Nu s-au putut încărca CV-urile.');
            }
        };

        fetchAllCVs();
    }, [user]);

    // Funcția care va redirecționa către pagina detaliilor CV-ului
    const handleViewFullCV = (cvId) => {
        navigate(`/cv-detail/${cvId}`); // Redirecționează către pagina cu detalii despre CV
    };

    return (
        <div className="cv-view-container mt-36">
            <h1 className="text-4xl font-semibold text-center text-blue-700 mb-10">All Student CVs</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {cvList.length === 0 ? (
                    <p className="text-center col-span-full">No CVs available.</p>
                ) : (
                    cvList.map((cv) => (
                        <div key={cv.id} className="cv-card p-4 border rounded-lg shadow-md hover:shadow-lg transition-all">
                            <div className="font-semibold text-lg">{cv.fullName}</div>
                            <div className="text-gray-600">{cv.email}</div>
                            <div className="text-gray-500">{cv.phone}</div>

                            <div className="mt-4">
                                <div className="text-sm font-medium">Education:</div>
                                <div className="text-gray-700">{cv.education}</div>
                            </div>
                            <div className="mt-4">
                                <div className="text-sm font-medium">Experience:</div>
                                <div className="text-gray-700">{cv.experience}</div>
                            </div>
                            <div className="mt-4">
                                <div className="text-sm font-medium">Skills:</div>
                                <div className="text-gray-700">{cv.skills}</div>
                            </div>

                            <div className="mt-4">
                                <button
                                    className="bg-blue-700 text-white p-2 rounded-md w-full mb-2"
                                    onClick={() => handleViewFullCV(cv.id)} // Apelăm funcția de redirecționare
                                >
                                    View Full CV
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UploadCVStudent;
