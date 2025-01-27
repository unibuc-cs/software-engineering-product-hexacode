import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CVDetailPage = () => {
    const { cvId } = useParams();  // Get cvId from URL
    const [cv, setCv] = useState(null);

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

    // Function to check if the field has valid content (not "N/A" or empty)
    const hasValidContent = (field) => {
        return field && field !== 'N/A';
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

            {/* Conditionally render fields based on content */}
            {hasValidContent(cv.email) && (
                <div className="contact-info mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Contact Information</h3>
                    <p><strong>Email:</strong> {cv.email}</p>
                    <p><strong>Phone:</strong> {cv.phone}</p>
                </div>
            )}

            {hasValidContent(cv.education) && (
                <div className="education mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Education</h3>
                    <p>{cv.education}</p>
                </div>
            )}

            {hasValidContent(cv.experience) && (
                <div className="experience mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Professional Experience</h3>
                    <p>{cv.experience}</p>
                </div>
            )}

            {hasValidContent(cv.skills) && (
                <div className="skills mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Skills</h3>
                    <p>{cv.skills}</p>
                </div>
            )}

            {hasValidContent(cv.technologies) && (
                <div className="technologies mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Technologies</h3>
                    <p>{cv.technologies}</p>
                </div>
            )}

            {hasValidContent(cv.certifications) && (
                <div className="certifications mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Certifications</h3>
                    <p>{cv.certifications}</p>
                </div>
            )}

            {hasValidContent(cv.projects) && (
                <div className="projects mb-8">
                    <h3 className="text-xl font-semibold text-blue-700 mb-4">Projects</h3>
                    <p>{cv.projects}</p>
                </div>
            )}
        </div>
    );
};

export default CVDetailPage;
