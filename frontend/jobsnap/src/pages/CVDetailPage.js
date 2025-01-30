import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CVTemplate from "../components/CVTemplate";

const CVDetailPage = () => {
    const { cvId } = useParams();  // Obținem cvId din URL
    const [cv, setCv] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCVDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cv/${cvId}`);
                if (!response.ok) {
                    throw new Error('Error fetching CV details');
                }
                const data = await response.json();
                setCv(data);
            } catch (error) {
                console.error("Error fetching CV:", error);
            }
        };

        fetchCVDetails();
    }, [cvId]);

    if (!cv) {
        return <div>Loading...</div>;
    }

    const handleViewCV = () => {
        setIsModalOpen(true);
    };

    const handleCloseCV = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="cv-detail-container max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-semibold text-center text-blue-700 mb-8">Full CV</h1>
            <div className="cv-header mb-6 flex items-center justify-between border-b-2 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{cv.fullName}</h2>
                    <p className="text-gray-600">{cv.cvType.charAt(0).toUpperCase() + cv.cvType.slice(1)} Professional</p>
                </div>
                {cv.imagePath && (
                    <img src={cv.imagePath} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                )}
            </div>

            {/* Detalii CV */}
            <div className="cv-details">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Contact Information</h3>
                <p><strong>Email:</strong> {cv.email}</p>
                <p><strong>Phone:</strong> {cv.phone}</p>

                <h3 className="text-xl font-semibold text-blue-700 mb-4">Education</h3>
                <p>{cv.education}</p>

                <h3 className="text-xl font-semibold text-blue-700 mb-4">Experience</h3>
                <p>{cv.experience}</p>

                <h3 className="text-xl font-semibold text-blue-700 mb-4">Skills</h3>
                <p>{cv.skills}</p>

                {cv.cvType === 'it' && (
                    <>
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Technologies</h3>
                        <p>{cv.technologies}</p>
                    </>
                )}

                {cv.cvType === 'business' && (
                    <>
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Business Skills</h3>
                        <p>{cv.skills}</p>
                    </>
                )}

                {cv.cvType === 'marketing' && (
                    <>
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Marketing Skills</h3>
                        <p>{cv.skills}</p>
                    </>
                )}

                {cv.cvType === 'graphicdesign' && (
                    <>
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Design Skills</h3>
                        <p>{cv.skills}</p>
                    </>
                )}

                {cv.cvType === 'healthcare' && (
                    <>
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Healthcare Skills</h3>
                        <p>{cv.skills}</p>
                    </>
                )}

                {cv.cvType === 'education' && (
                    <>
                        <h3 className="text-xl font-semibold text-blue-700 mb-4">Degree</h3>
                        <p>{cv.degree}</p>
                    </>
                )}

                {/* Render Projects and Certifications for any CV type */}
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Projects</h3>
                <p>{cv.projects}</p>

                <h3 className="text-xl font-semibold text-blue-700 mb-4">Certifications</h3>
                <p>{cv.certifications}</p>
            </div>

            {/* Show CV Template in Modal */}
            <button
                onClick={handleViewCV}
                className="mt-8 bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
            >
                View CV Template
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-5xl shadow-2xl relative overflow-y-auto" style={{ height: "90vh" }}>
                        <button
                            onClick={handleCloseCV}
                            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                        <CVTemplate formData={cv} image={cv.imagePath} cvType={cv.cvType} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CVDetailPage;
