import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import './Profile.css';
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import CVTemplate from '../components/CVTemplate'; // Importă CVTemplate

const Profile = () => {
    const { user } = useAuth(); // Obține utilizatorul din contextul de autentificare
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [cvList, setCvList] = useState([]); // Lista CV-urilor utilizatorului
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return; // Dacă nu există utilizator, nu face nicio cerere pentru profil
        }


        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile/${user.id}`);
                if (!response.ok) {
                    throw new Error('Error fetching profile');
                }
                const data = await response.json();
                setProfile(data);
                setUpdatedProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert('Nu s-a putut încărca profilul. Vă rugăm să încercați din nou.');
            }
        };


        const fetchCVs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cv/user/${user.id}`);
                if (!response.ok) {
                    throw new Error('Error fetching CVs');
                }
                const data = await response.json();
                console.log("Fetched CVs:", data); // Verifică ce date primești
                setCvList(data); // Set CV list
            } catch (error) {
                console.error("Error fetching CVs:", error);
                alert('Nu s-au putut încărca CV-urile. Vă rugăm să încercați din nou.');
            }
        };

        fetchProfile();
        fetchCVs();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleUpdateProfile = async () => {
        try {
            const { user, ...profileWithoutUser } = updatedProfile;
            const response = await axios.put(`http://localhost:8080/profile/${user.id}`, profileWithoutUser);

            setProfile(response.data);
            setIsEditing(false);
            alert('Profilul a fost actualizat cu succes');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('A apărut o eroare la actualizarea profilului.');
        }
    };

    const handleEditCV = (cvId) => {
        // Navighează către pagina de editare a CV-ului
        navigate(`/edit-cv/${cvId}`);
    };

    const handleDownloadPDF = (cvId) => {
        // Identifică elementul corespunzător pentru CV-ul selectat
        const element = document.getElementById(`cv-preview-${cvId}`);
        const options = {
            filename: `${cvId}-CV.pdf`,
            jsPDF: { unit: 'pt', format: 'a4' },
            html2canvas: { scale: 3 },
        };

        // Crează și descarcă PDF-ul
        html2pdf().set(options).from(element).save();
    };

    const handleDeleteCV = async (cvId) => {
        const confirmDelete = window.confirm("Ești sigur că vrei să ștergi acest CV?");
        if (!confirmDelete) return;

        try {
            // Trimite cererea DELETE către server
            const response = await axios.delete(`http://localhost:8080/api/cv/${cvId}`);

            if (response.status === 200 || response.status === 204) {
                // Actualizează lista de CV-uri din frontend
                setCvList(cvList.filter(cv => cv.id !== cvId)); // Îndepărtează CV-ul șters din lista de CV-uri
                alert('CV-ul a fost șters cu succes');
            } else {
                throw new Error('Failed to delete CV');
            }
        } catch (error) {
            console.error("Error deleting CV:", error);
            alert('A apărut o eroare la ștergerea CV-ului.');
        }
    };

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    if (!profile) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile</h1>

            {/* Profile details */}
            {isEditing ? (
                <div className="edit-form">
                    <label className="form-label">
                        First Name:
                        <input
                            className="input-field"
                            type="text"
                            name="firstName"
                            value={updatedProfile.firstName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="form-label">
                        Last Name:
                        <input
                            className="input-field"
                            type="text"
                            name="lastName"
                            value={updatedProfile.lastName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="form-label">
                        Bio:
                        <textarea
                            className="input-field"
                            name="bio"
                            value={updatedProfile.bio}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="form-label">
                        Contact Info:
                        <input
                            className="input-field"
                            type="text"
                            name="contactInfo"
                            value={updatedProfile.contactInfo}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="button-group">
                        <button className="button save-button" onClick={handleUpdateProfile}>Save</button>
                        <button className="button cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Contact Info:</strong> {profile.contactInfo}</p>
                    <button className="button edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}

            {/* CV section */}
            <div className="cv-section">
                <p className="cv-message">Aici poți vizualiza și gestiona CV-urile create.</p> {/* Centrat și evidențiat */}

                <div className="cv-list">
                    {cvList.length === 0 ? (
                        <p>No CVs found. Create one to start.</p>
                    ) : (
                        <ul>
                            {cvList.map((cv) => (
                                <li key={cv.id} className="cv-card">


                                    <div id={`cv-preview-${cv.id}`} className="cv-preview">
                                        <CVTemplate formData={cv} image={cv.imagePath} cvType={cv.cvType}/>
                                    </div>


                                    <div className="cv-actions">
                                        <button onClick={() => handleDownloadPDF(cv.id)}>Download</button>
                                        <button onClick={() => handleEditCV(cv.id)}>Edit</button>
                                        <button onClick={() => handleDeleteCV(cv.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Profile;
