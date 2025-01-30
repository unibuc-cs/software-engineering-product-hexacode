import React, { useState } from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, cvId }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        console.log("Confirm deleting CV with ID:", cvId);
        onConfirm(cvId);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to delete this?</h3>
                <div className="modal">
                    <h2>Are you sure you want to delete this CV?</h2>
                    <button onClick={handleConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};


export default ConfirmDeleteModal;
