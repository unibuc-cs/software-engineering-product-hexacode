import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CVTemplate from "../components/CVTemplate";

const UploadCVStudent = () => {
    const { user } = useAuth();
    const [cvList, setCvList] = useState([]);
    const [selectedCV, setSelectedCV] = useState(null); // Stare pentru CV-ul selectat

    useEffect(() => {
        if (!user) {
            return;
        }

        const fetchCVs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cv/user/${user.id}`);
                if (!response.ok) {
                    throw new Error('Error fetching CVs');
                }
                const data = await response.json();
                setCvList(data);
            } catch (error) {
                console.error("Error fetching CVs:", error);
                alert('Nu s-au putut încărca CV-urile.');
            }
        };

        fetchCVs();
    }, [user]);

    const handleViewCV = (cv) => {
        setSelectedCV(cv); // Setează CV-ul selectat pentru vizualizare completă
    };

    const handleCloseCV = () => {
        setSelectedCV(null); // Închide vizualizarea completă a CV-ului
    };

    return (
        <div className="upload-cv-container mt-28 min-h-screen bg-gray-100 py-12">
            <h1 className="text-4xl font-semibold text-center text-blue-700 mb-10 tracking-wide shadow-lg p-2 border-b-4 border-blue-500">
                Uploaded CVs
            </h1>

            {/* Modal pentru vizualizarea completă a CV-ului */}
            {selectedCV && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-11/12 max-w-4xl overflow-y-auto" style={{ height: '90vh' }}>
                        <button onClick={handleCloseCV} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full">
                            Close
                        </button>
                        <div className="cv-preview-container overflow-y-auto max-h-[80vh]">
                            <CVTemplate formData={selectedCV} image={selectedCV.imagePath} cvType={selectedCV.cvType} />
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {cvList.length === 0 ? (
                    <p className="text-center col-span-full">No CVs uploaded yet.</p>
                ) : (
                    cvList.map((cv) => (
                        <div key={cv.id} className="cv-card p-4 border rounded-lg shadow-md hover:shadow-lg transition-all">
                            {/* CV Preview Component */}
                            <div className="cv-preview">
                                <div className="font-semibold text-lg">{cv.fullName}</div>
                                <div className="text-gray-600">{cv.email}</div>
                                <div className="text-gray-500">{cv.phone}</div>

                                {/* Displaying CV details */}
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
                            </div>

                            {/* Buttons */}
                            <div className="cv-actions mt-4">
                                <button
                                    onClick={() => handleViewCV(cv)}
                                    className="bg-blue-700 text-white p-2 rounded-md w-full mb-2"
                                >
                                    View CV
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
