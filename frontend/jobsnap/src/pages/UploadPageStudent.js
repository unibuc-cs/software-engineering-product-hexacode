import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CVTemplate from "../components/CVTemplate";
import axios from "axios";

const UploadCVStudent = () => {
    const { user } = useAuth();
    const [cvList, setCvList] = useState([]);
    const [selectedCV, setSelectedCV] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of CVs per page

    // Fetch CVs only when the user is authenticated
    useEffect(() => {
        if (!user) return;

        const fetchUploadedCVs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cv/uploaded/${user.id}`);
                if (!response.ok) {
                    throw new Error("Error fetching uploaded CVs");
                }
                const data = await response.json();
                setCvList(data);  // Actualizezi lista de CV-uri uploadate
            } catch (error) {
                console.error("Error fetching uploaded CVs:", error);
                alert("Nu s-au putut încărca CV-urile uploadate.");
            }
        };

        fetchUploadedCVs();
    }, [user]);  // Asigură-te că lista se reîncarcă dacă utilizatorul se schimbă


    // Handle viewing a CV (Modal)
    const handleViewCV = (cv) => {
        setSelectedCV(cv);
    };

    const handleCloseCV = () => {
        setSelectedCV(null);
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCVs = cvList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cvList.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle uploading the CV
    const handleUploadCV = async (cvId) => {
        const cvToUpload = cvList.find(cv => cv.id === cvId);
        if (!cvToUpload) {
            alert("CV-ul nu a fost găsit.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/cv/upload', cvToUpload);
            if (response.status === 200) {
                alert('CV-ul a fost încărcat cu succes!');
                // Actualizează lista de CV-uri din pagina de upload
            }
        } catch (error) {
            console.error("Error uploading CV:", error);
            alert('A apărut o eroare la încărcarea CV-ului.');
        }
    };

    // Handle deleting a CV from the page (but keeping it in the profile)
    const handleDeleteCV = (cvId) => {
        setCvList(cvList.filter(cv => cv.id !== cvId)); // Remove the CV from the list displayed on the page
    };

    return (
        <div className="upload-cv-container mt-28 min-h-screen bg-gray-50 py-12">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-12 tracking-wide shadow-lg p-4 border-b-4 border-blue-600 rounded-lg bg-white">
                Uploaded CVs
            </h1>

            {/* Modal for full CV preview */}
            {selectedCV && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-5xl shadow-2xl relative overflow-y-auto" style={{ height: "90vh" }}>
                        <button
                            onClick={handleCloseCV}
                            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                        <div className="cv-preview-container overflow-y-auto max-h-[80vh]">
                            <CVTemplate formData={selectedCV} image={selectedCV.imagePath} cvType={selectedCV.cvType} />
                        </div>
                    </div>
                </div>
            )}

            {/* CV cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {currentCVs.length === 0 ? (
                    <p className="text-center col-span-full text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg shadow-md">
                        No CVs uploaded yet.
                    </p>
                ) : (
                    currentCVs.map((cv) => (
                        <div key={cv.id} className="cv-card p-6 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all">
                            <div className="cv-preview">
                                <h2 className="font-semibold text-xl text-blue-700 mb-2">{cv.fullName}</h2>
                                <p className="text-gray-600">{cv.email}</p>
                                <p className="text-gray-500">{cv.phone}</p>

                                <div className="mt-4">
                                    <div className="text-sm font-medium text-gray-700">Education:</div>
                                    <p className="text-gray-800">{cv.education}</p>
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm font-medium text-gray-700">Experience:</div>
                                    <p className="text-gray-800">{cv.experience}</p>
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm font-medium text-gray-700">Skills:</div>
                                    <p className="text-gray-800">{cv.skills}</p>
                                </div>
                            </div>

                            <div className="cv-actions mt-6">
                                <button
                                    onClick={() => handleViewCV(cv)}
                                    className="bg-blue-700 text-white py-2 px-4 rounded-lg w-full shadow-md hover:bg-blue-800 transition-all"
                                >
                                    View CV
                                </button>
                                <button
                                    onClick={() => handleDeleteCV(cv.id)} // Call delete function
                                    className="bg-red-700 text-white py-2 px-4 rounded-lg w-full shadow-md hover:bg-red-800 transition-all"
                                >
                                    Delete CV
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg shadow-md text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg shadow-md text-white ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadCVStudent;
