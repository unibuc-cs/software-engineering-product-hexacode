import React, { useState } from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, cvId }) => {
    if (!isOpen) return null; // Hide the modal if it's not open

    const handleConfirm = () => {
        console.log("Confirm deleting CV with ID:", cvId); // Log the CV ID being deleted
        onConfirm(cvId); // Pass the CV ID to confirm the deletion
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to delete this?</h3>
                <div className="modal-actions">
                    <button onClick={handleConfirm} className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2">
                        Yes
                    </button>
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmDeleteModal;
