import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadCVStudent = () => {
    const { user } = useAuth();
    const [cvList, setCvList] = useState([]);
    const [allCvs, setAllCvs] = useState([]);  // Store all CVs for when no filter is applied
    const [cvType, setCvType] = useState('');   // State to store the selected cvType
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'employer') {
            return;
        }

        // Function to fetch filtered CVs
        const fetchFilteredCVs = async (cvType) => {
            try {
                const response = await fetch('http://localhost:8080/api/cv/allcvs');
                if (!response.ok) {
                    throw new Error('Error fetching CVs');
                }
                const data = await response.json();
                console.log("Fetched CVs:", data);

                const filteredData = cvType
                    ? data.filter((cv) => cv.cvType?.toLowerCase() === cvType.toLowerCase()) // Match cvType
                    : data;

                setAllCvs(data); // Store all CVs
                setCvList(filteredData); // Apply filter or show all
            } catch (error) {
                console.error("Error fetching CVs:", error);
                alert('Nu s-au putut încărca CV-urile.');
            }
        };

        // Fetch all CVs initially
        const fetchAllCVs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cv/allcvs');
                if (!response.ok) {
                    throw new Error('Error fetching CVs');
                }
                const data = await response.json();
                setAllCvs(data);  // Store all CVs to reset when the filter is cleared
                setCvList(data);  // Initially show all CVs
            } catch (error) {
                console.error("Error fetching all CVs:", error);
                alert('Nu s-au putut încărca CV-urile.');
            }
        };

        fetchAllCVs();  // Load all CVs on initial render
        fetchFilteredCVs(cvType);  // Load filtered CVs based on cvType

    }, [user, cvType]); // Trigger on user or cvType change

    // Handle cvType filter change
    const handleCvTypeChange = (event) => {
        setCvType(event.target.value); // Update the selected cvType
    };

    // Function to navigate to the full CV details page
    const handleViewFullCV = (cvId) => {
        navigate(`/cv-detail/${cvId}`);
    };

    return (
        <div className="cv-view-container mt-36">
            <h1 className="text-4xl font-semibold text-center text-blue-700 mb-10">All Student CVs</h1>

            {/* CV Type Filter Dropdown */}
            <div className="mb-6 text-center">
                <select
                    value={cvType}
                    onChange={handleCvTypeChange}
                    className="border p-2 rounded-md">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {cvList.length === 0 ? (
                    <p className="text-center col-span-full text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg shadow-md">
                        No CVs available for the selected category.
                    </p>
                ) : (
                    cvList.map((cv) => (
                        <div key={cv.id}
                             className="cv-card p-4 border rounded-lg shadow-md hover:shadow-lg transition-all">
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
                                    onClick={() => handleViewFullCV(cv.id)} // Navigate to full CV
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
