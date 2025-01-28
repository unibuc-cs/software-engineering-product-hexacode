import React, { useState } from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to delete this?</h3>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2">
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
