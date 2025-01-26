import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CVDetailPage = () => {
    const { cvId } = useParams();  // Obținem cvId din URL
    const [cv, setCv] = useState(null);

    useEffect(() => {
        const fetchCVDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cv/${cvId}`);  // Endpoint pentru CV detaliu
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

    return (
        <div className="cv-detail-container mt-36">
            <h1 className="text-4xl font-semibold text-center text-blue-700 mb-10">Full CV Details</h1>
            <div className="cv-detail">
                <h2>{cv.fullName}</h2>
                <p><strong>Email:</strong> {cv.email}</p>
                <p><strong>Phone:</strong> {cv.phone}</p>
                <p><strong>Education:</strong> {cv.education}</p>
                <p><strong>Experience:</strong> {cv.experience}</p>
                <p><strong>Skills:</strong> {cv.skills}</p>
                <p><strong>Technologies:</strong> {cv.technologies}</p>
                <p><strong>Certifications:</strong> {cv.certifications}</p>
                <p><strong>Projects:</strong> {cv.projects}</p>
                {/* Adaugă orice alt câmp relevant */}
            </div>
        </div>
    );
};

export default CVDetailPage;
