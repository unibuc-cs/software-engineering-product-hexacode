import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importă contextul de autentificare
import './Profile.css';
import html2pdf from 'html2pdf.js'; // Importăm biblioteca pentru export PDF

const Profile = () => {
    const { user } = useAuth(); // Obține utilizatorul din contextul de autentificare
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [cvList, setCvList] = useState([]); // Lista CV-urilor utilizatorului

    useEffect(() => {
        if (!user) {
            return; // Dacă nu există utilizator, nu face nicio cerere pentru profil
        }

        // Fetch profile data
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profile/${user.id}`);
                if (!response.ok) {
                    throw new Error('Error fetching profile');
                }
                const data = await response.json();
                setProfile(data);
                setUpdatedProfile(data); // Initialize update form with fetched data
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert('Nu s-a putut încărca profilul. Vă rugăm să încercați din nou.');
            }
        };

        // Fetch CVs
        const fetchCVs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/cv/${user.id}`);
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
        fetchCVs(); // Fetch CVs when the component mounts
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
            setIsEditing(false); // Exit edit mode
            alert('Profilul a fost actualizat cu succes');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('A apărut o eroare la actualizarea profilului.');
        }
    };

    const handleEditCV = (cvId) => {
        // Funcționalitate pentru editarea CV-ului (poți implementa un formular de editare similar cu cel de la profil)
        alert('Funcționalitatea de editare CV nu este încă implementată.');
    };

    const handleDownloadPDF = (cv) => {
        // Generăm PDF pentru un anumit CV
        const element = document.getElementById('cv-preview');
        const options = {
            filename: `${cv.fullName || 'My-CV'}.pdf`,
            jsPDF: { unit: 'pt', format: 'a4' },
            html2canvas: { scale: 3 },
        };

        html2pdf().set(options).from(element).save();
    };

    const handleDeleteCV = async (cvId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/cvs/${cvId}`);
            if (response.status === 200) {
                // Actualizează lista de CV-uri după ștergere
                setCvList(cvList.filter(cv => cv.id !== cvId));
                alert('CV-ul a fost șters cu succes');
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
                                    <p><strong>Full Name:</strong> {cv.fullName}</p>
                                    <p><strong>Email:</strong> {cv.email}</p>
                                    <p><strong>Phone:</strong> {cv.phone}</p>

                                    {/* Afișează câmpurile corespunzătoare tipului de CV */}
                                    {cv.cvType === 'it' && (
                                        <div>
                                            <p><strong>Summary:</strong> {cv.summary || 'N/A'}</p>
                                            <p><strong>Education:</strong> {cv.education || 'N/A'}</p>
                                            <p><strong>Experience:</strong> {cv.experience || 'N/A'}</p>
                                            <p><strong>Technical Skills:</strong> {cv.skills || 'N/A'}</p>
                                            <p><strong>Technologies:</strong> {cv.technologies || 'N/A'}</p>
                                            <p><strong>Certifications:</strong> {cv.certifications || 'N/A'}</p>
                                            <p><strong>Projects:</strong> {cv.projects || 'N/A'}</p>
                                        </div>
                                    )}
                                    {cv.cvType === 'business' && (
                                        <div>
                                            <p><strong>Summary:</strong> {cv.summary || 'N/A'}</p>
                                            <p><strong>Education:</strong> {cv.education || 'N/A'}</p>
                                            <p><strong>Work Experience:</strong> {cv.experience || 'N/A'}</p>
                                            <p><strong>Business Skills:</strong> {cv.skills || 'N/A'}</p>
                                            <p><strong>Certifications:</strong> {cv.certifications || 'N/A'}</p>
                                            <p><strong>Projects:</strong> {cv.projects || 'N/A'}</p>
                                        </div>
                                    )}
                                    {cv.cvType === 'marketing' && (
                                        <div>
                                            <p><strong>Summary:</strong> {cv.summary || 'N/A'}</p>
                                            <p><strong>Education:</strong> {cv.education || 'N/A'}</p>
                                            <p><strong>Work Experience:</strong> {cv.experience || 'N/A'}</p>
                                            <p><strong>Marketing Skills:</strong> {cv.skills || 'N/A'}</p>
                                            <p><strong>Marketing Tools:</strong> {cv.tools || 'N/A'}</p>
                                            <p><strong>Campaign Experience:</strong> {cv.campaignExperience || 'N/A'}
                                            </p>
                                            <p><strong>Target Audience:</strong> {cv.targetAudience || 'N/A'}</p>
                                            <p><strong>Certifications:</strong> {cv.certifications || 'N/A'}</p>
                                            <p><strong>Projects:</strong> {cv.projects || 'N/A'}</p>
                                        </div>
                                    )}
                                    {cv.cvType === 'healthcare' && (
                                        <div>
                                            <p><strong>Summary:</strong> {cv.summary || 'N/A'}</p>
                                            <p><strong>Education:</strong> {cv.education || 'N/A'}</p>
                                            <p><strong>Work Experience:</strong> {cv.experience || 'N/A'}</p>
                                            <p><strong>Healthcare Skills:</strong> {cv.skills || 'N/A'}</p>
                                            <p><strong>Healthcare Tools:</strong> {cv.tools || 'N/A'}</p>
                                            <p><strong>Clinical Experience:</strong> {cv.clinicalExperience || 'N/A'}
                                            </p>
                                            <p><strong>Certifications:</strong> {cv.certifications || 'N/A'}</p>
                                            <p><strong>Medical Projects:</strong> {cv.projects || 'N/A'}</p>
                                        </div>
                                    )}
                                    {cv.cvType === 'education' && (
                                        <div>
                                            <p><strong>Summary:</strong> {cv.summary || 'N/A'}</p>
                                            <p><strong>Education:</strong> {cv.education || 'N/A'}</p>
                                            <p><strong>Degree:</strong> {cv.degree || 'N/A'}</p>
                                            <p><strong>Awards:</strong> {cv.awards || 'N/A'}</p>
                                        </div>
                                    )}
                                    {cv.cvType === 'graphicdesign' && (
                                        <div>
                                            <p><strong>Summary:</strong> {cv.summary || 'N/A'}</p>
                                            <p><strong>Education:</strong> {cv.education || 'N/A'}</p>
                                            <p><strong>Work Experience:</strong> {cv.experience || 'N/A'}</p>
                                            <p><strong>Design Skills:</strong> {cv.skills || 'N/A'}</p>
                                            <p><strong>Design Tools:</strong> {cv.tools || 'N/A'}</p>
                                            <p><strong>Portfolio:</strong> {cv.portfolio || 'N/A'}</p>
                                            <p><strong>Certifications:</strong> {cv.certifications || 'N/A'}</p>
                                            <p><strong>Projects:</strong> {cv.projects || 'N/A'}</p>
                                        </div>
                                    )}

                                    <div className="cv-actions">
                                        <button onClick={() => handleDownloadPDF(cv)}>Download</button>
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
