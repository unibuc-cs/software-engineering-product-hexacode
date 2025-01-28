import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import './Profile.css';
import { useNavigate } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import CVTemplate from '../components/CVTemplate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const Profile = () => {
    const { user } = useAuth();
    console.log("User:", user);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [cvList, setCvList] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cvToDelete, setCvToDelete] = useState(null); // Stochează CV-ul care urmează să fie șters

    const notifySuccess = () => toast.success("CV a fost șters cu succes!");
    const notifyError = () => toast.error("A apărut o eroare la ștergerea CV-ului.");

    useEffect(() => {
        if (!user) {
            return; // Dacă nu există utilizator, nu face nicio cerere pentru profil
        }


        console.log("User from context:", user);

        const fetchProfile = async () => {
            try {
                console.log("User role:", user.role);  // Verifică ce rol are utilizatorul
                // Verificăm rolul utilizatorului pentru a alege endpoint-ul corect
                const endpoint = user.role === 'student'
                    ? `http://localhost:8080/api/students/${user.id}`
                    : `http://localhost:8080/api/employers/${user.id}`;

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Error fetching profile');
                }
                const data = await response.json();
                setProfile(data);
                setUpdatedProfile(data);
                console.log("Updated profile:", updatedProfile);

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
                console.log("Fetched CVs:", data);
                setCvList(data);
            } catch (error) {
                console.error("Error fetching CVs:", error);

            }
        };

        fetchProfile();
        fetchCVs();
    }, [user]);



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
            }
        } catch (error) {
            console.error("Error uploading CV:", error);
            alert('A apărut o eroare la încărcarea CV-ului.');
        }
    };

    const handleUploadRedirect2 = () => {
        navigate('/upload-cv-page'); // Redirecționează la pagina de upload pentru studenți
    };

    const handleUploadRedirect3 = () => {
        navigate('/upload-cv-student'); // Redirecționează la pagina de upload pentru studenți
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleUpdateProfile = async () => {

        if (!user || !user.role) {
            alert('User data is missing or session has expired.');
            return;
        }

        try {

            const { user: userFromProfile, ...profileWithoutUser } = updatedProfile;

            // Verifică rolul pentru a alege endpoint-ul corect
            const endpoint = user.role === 'student'
                ? `http://localhost:8080/api/students/update/${user.id}`
                : `http://localhost:8080/api/employers/update/${user.id}`;


            const response = await axios.put(endpoint, profileWithoutUser);


            setProfile(response.data);
            setIsEditing(false);
            alert('Profilul a fost actualizat cu succes');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('A apărut o eroare la actualizarea profilului.');
        }
    };



    const handleEditCV = (cvId) => {

        navigate(`/edit-cv/${cvId}`);
    };

    const handleDownloadPDF = (cvId) => {

        const element = document.getElementById(`cv-preview-${cvId}`);
        const options = {
            filename: `${cvId}-CV.pdf`,
            jsPDF: { unit: 'pt', format: 'a4' },
            html2canvas: { scale: 3 },
        };


        html2pdf().set(options).from(element).save();
    };


    const handleDeleteCV = (cvId) => {
        setCvToDelete(cvId); // Salvează CV-ul care urmează să fie șters
        setIsModalOpen(true); // Deschide modalul
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/cv/${cvToDelete}`);
            if (response.status === 200 || response.status === 204) {
                setCvList(cvList.filter(cv => cv.id !== cvToDelete));  // Actualizează lista de CV-uri
                notifySuccess();
            } else {
                throw new Error('Failed to delete CV');
            }
        } catch (error) {
            console.error("Error deleting CV:", error);
            notifyError();
        } finally {
            setIsModalOpen(false); // Închide modalul
            setCvToDelete(null); // Resetează starea cvToDelete
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false); // Închide modalul fără a face nimic
        setCvToDelete(null); // Resetează starea cvToDelete
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

                    {/* Render different fields based on the user role */}
                    {user.role === 'student' && (
                        <>
                            <label className="form-label">
                                University Name:
                                <input
                                    className="input-field"
                                    type="text"
                                    name="universityName"
                                    value={updatedProfile.universityName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-label">
                                University Email:
                                <input
                                    className="input-field"
                                    type="text"
                                    name="universityEmail"
                                    value={updatedProfile.universityEmail}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-label">
                                Phone:
                                <input
                                    className="input-field"
                                    type="text"
                                    name="phone"
                                    value={updatedProfile.phone}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </>
                    )}
                    {user.role === 'employer' && (
                        <>
                            <label className="form-label">
                                Company Name:
                                <input
                                    className="input-field"
                                    type="text"
                                    name="companyName"
                                    value={updatedProfile.companyName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-label">
                                Company Email:
                                <input
                                    className="input-field"
                                    type="text"
                                    name="companyEmail"
                                    value={updatedProfile.companyEmail}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-label">
                                Company Phone:
                                <input
                                    className="input-field"
                                    type="text"
                                    name="companyPhone"
                                    value={updatedProfile.companyPhone}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </>
                    )}

                    <div className="button-group">
                        <button className="button save-button " onClick={handleUpdateProfile}>Save</button>
                        <button className="button cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>

                    {/* Render different fields based on the user role */}
                    {user.role === 'student' && (
                        <>
                            <p><strong>University Name:</strong> {profile.universityName}</p>
                            <p><strong>University Email:</strong> {profile.universityEmail}</p>
                            <p><strong>Phone:</strong> {profile.phone}</p>
                        </>
                    )}
                    {user.role === 'employer' && (
                        <>
                            <p><strong>Company Name:</strong> {profile.companyName}</p>
                            <p><strong>Company Email:</strong> {profile.companyEmail}</p>
                            <p><strong>Company Phone:</strong> {profile.companyPhone}</p>
                        </>
                    )}

                    <button className="button edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}



            {/* Only display CV section for students */}
            {user.role === 'student' && (
                <div className="cv-section">
                    <p className="cv-message">Here you can view and manage your CVs.</p>
                    <button
                        className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-300"
                        onClick={handleUploadRedirect3}
                    >
                        View All CVs
                    </button>

                    <div className="cv-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                        {cvList.length === 0 ? (
                            <p className="text-center col-span-full text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-lg shadow-md">
                                No CVs found. Create one to start.
                            </p>
                        ) : (
                            cvList.map((cv) => (
                                <div key={cv.id}
                                     className="cv-card p-6 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all">
                                    <div id={`cv-preview-${cv.id}`} className="cv-preview">
                                        <CVTemplate formData={cv} image={cv.imagePath} cvType={cv.cvType}/>
                                    </div>


                                    <div className="cv-actions mt-6">
                                        <button
                                            onClick={() => handleDownloadPDF(cv.id)}
                                            className="bg-blue-700 text-white py-2 px-4 rounded-lg w-full shadow-md hover:bg-blue-800 transition-all"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() => handleEditCV(cv.id)}
                                            className="bg-green-700 text-white py-2 px-4 rounded-lg w-full shadow-md hover:bg-green-800 transition-all mt-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCV(cv.id)}
                                            className="bg-red-700 text-white py-2 px-4 rounded-lg w-full shadow-md hover:bg-red-800 transition-all mt-2"
                                        >
                                            Delete
                                        </button>

                                        {/* Modalul de confirmare */}
                                        <ConfirmDeleteModal
                                            isOpen={isModalOpen}
                                            onClose={cancelDelete}
                                            onConfirm={confirmDelete}
                                        />
                                        <button
                                            onClick={() => handleUploadCV(cv.id)}
                                            className="bg-indigo-700 text-white py-2 px-4 rounded-lg w-full shadow-md hover:bg-indigo-800 transition-all mt-2"
                                        >
                                            Upload CV
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                </div>
            )}
            <ToastContainer />

            {/* Only display CV section for students */}
            {user.role === 'employer' && (
                <div className="cv-section text-center mt-6">
                    <button
                        className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-300"
                        onClick={handleUploadRedirect2}
                    >
                        View All CVs
                    </button>
                </div>
            )}

        </div>
    );
};

export default Profile;
