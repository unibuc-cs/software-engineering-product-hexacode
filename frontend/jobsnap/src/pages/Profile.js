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
    const [cvToDelete, setCvToDelete] = useState(null);



    const notifySuccess = () => toast.success("The CV has been deleted successfully!");
    const notifyError = () => toast.error("An error occurred while deleting the CV.");

    const notifySuccess1 = () => toast.success("The CV has been uploaded successfully!");
    const notifyError1 = () => toast.error("An error occurred while uploading the CV.");

    const notifySuccess2 = () => toast.success("The profile has been updated successfully.");
    const notifyError2 = () => toast.error("An error occurred while updating the profile.");

    useEffect(() => {
        if (!user) {
            return;
        }


        console.log("User from context:", user);

        const fetchProfile = async () => {
            try {
                console.log("User role:", user.role);
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

            }
        } catch (error) {
            console.error("Error uploading CV:", error);
            notifyError1();
        }
    };

    const handleUploadRedirect2 = () => {
        navigate('/upload-cv-page'); // Redirecționează la pagina de upload pentru employer
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
            notifySuccess2();
        } catch (error) {
            console.error("Error updating profile:", error);
            notifyError2();
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

    const handleDeleteCV = async (cvId) => {

        try {

            const response = await axios.delete(`http://localhost:8080/api/cv/${cvId}`);

            if (response.status === 200 || response.status === 204) {

                setCvList(cvList.filter(cv => cv.id !== cvId));
                notifySuccess();
            } else {
                throw new Error('Failed to delete CV');
            }
        } catch (error) {
            console.error("Error deleting CV:", error);
          notifyError();
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
                        View Your Uploaded CVs
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



                                        <button
                                            onClick={() => {
                                                notifySuccess1();
                                                handleUploadCV(cv.id);
                                            }}
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
            <ToastContainer/>

            {/* Only display CV section for employers */}
            {user.role === 'employer' && (
                <div className="cv-section text-center mt-6">
                    <button
                        className="bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-300"
                        onClick={handleUploadRedirect2}
                    >
                        View All The Uploaded CVs By Students
                    </button>
                </div>
            )}

        </div>
    );
};

export default Profile;
