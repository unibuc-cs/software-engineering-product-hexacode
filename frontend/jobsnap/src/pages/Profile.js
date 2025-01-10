import React, { useState, useEffect } from "react";
import axios from "axios";
import './Profile.css';
const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const userId = 1; // Replace with actual user ID (e.g., from auth context)

    useEffect(() => {
        // Fetch profile data when the component mounts
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/profile/${userId}`);
                console.log(response.data);  // Debugging line to log profile data
                setProfile(response.data);
                setUpdatedProfile(response.data); // Initialize update form with fetched data
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value); // Debugging line to check changes in input fields
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handleUpdateProfile = async () => {
        console.log("Save button clicked"); // Debugging line
        console.log("Updated profile data:", updatedProfile); // Debugging line to check the data being sent
        try {
            const response = await axios.put(`http://localhost:8080/profile/${userId}`, updatedProfile);
            console.log("Profile updated successfully", response.data); // Log response data
            setProfile(response.data);
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!profile) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile</h1>
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
        </div>
    );
};

export default Profile;
