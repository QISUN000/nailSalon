import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-end gap-4">
          <button 
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            No
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;