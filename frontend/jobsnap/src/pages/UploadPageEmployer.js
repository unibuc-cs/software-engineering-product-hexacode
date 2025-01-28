import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadCVStudent = () => {
    const { user } = useAuth();
    const [cvList, setCvList] = useState([]);
    const [allCvs, setAllCvs] = useState([]);
    const [cvType, setCvType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [cvsPerPage] = useState(6); // Number of CVs per page
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'employer') {
            return;
        }

        const fetchFilteredCVs = async (cvType) => {
            try {
                const response = await fetch('http://localhost:8080/api/cv/allcvs');
                if (!response.ok) {
                    throw new Error('Error fetching CVs');
                }
                const data = await response.json();
                const filteredData = cvType
                    ? data.filter((cv) => cv.cvType?.toLowerCase() === cvType.toLowerCase())
                    : data;
                setAllCvs(data);
                setCvList(filteredData);
            } catch (error) {
                console.error("Error fetching CVs:", error);
                alert('Failed to load CVs.');
            }
        };

        fetchFilteredCVs(cvType);
    }, [user, cvType]);

    // Handle cvType filter change
    const handleCvTypeChange = (event) => {
        setCvType(event.target.value);
        setCurrentPage(1); // Reset to the first page when the filter changes
    };

    // Handle pagination
    const indexOfLastCV = currentPage * cvsPerPage;
    const indexOfFirstCV = indexOfLastCV - cvsPerPage;
    const currentCVs = cvList.slice(indexOfFirstCV, indexOfLastCV);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Navigate to the full CV details page
    const handleViewFullCV = (cvId) => {
        navigate(`/cv-detail/${cvId}`);
    };

    return (
        <div className="cv-view-container mt-20 px-4">
            <h1 className="text-4xl font-semibold text-center text-blue-700 mb-10">All Student CVs</h1>

            {/* CV Type Filter Dropdown */}
            <div className="mb-6 text-center">
                <select
                    value={cvType}
                    onChange={handleCvTypeChange}
                    className="border p-2 rounded-md"
                >
                    <option value="">All CVs</option>
                    <option value="it">IT/Software Development</option>
                    <option value="business">Business/Economics</option>
                    <option value="marketing">Marketing</option>
                    <option value="graphicdesign">Graphic Design</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education (Teacher)</option>
                </select>
            </div>

            {/* Display CVs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCVs.length === 0 ? (
                    <p className="text-center col-span-full text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg shadow-md">
                        No CVs available for the selected category.
                    </p>
                ) : (
                    currentCVs.map((cv) => (
                        <div
                            key={cv.id}
                            className="cv-card p-4 border rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <div className="font-semibold text-lg mb-1">{cv.fullName}</div>
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
                                <button
                                    className="bg-blue-700 text-white p-2 rounded-md w-full mb-2"
                                    onClick={() => handleViewFullCV(cv.id)}
                                >
                                    View Full CV
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="mt-8 mb-8 flex justify-center items-center space-x-2">
                {Array.from({ length: Math.ceil(cvList.length / cvsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === index + 1
                                ? 'bg-blue-700 text-white'
                                : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UploadCVStudent;
