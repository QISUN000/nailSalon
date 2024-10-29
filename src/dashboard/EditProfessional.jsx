import React, { useState, useEffect } from 'react';
import { getProfessionalById, updateProfessional } from '../api/api';

const EditProfessional = ({ isOpen, onClose, professionalId }) => {
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    instagramHandle: '',
    price: '',
    role: '',
    available: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && professionalId) {
      fetchProfessionalDetails();
    }
  }, [isOpen, professionalId]);

  const fetchProfessionalDetails = async () => {
    try {
      const professional = await getProfessionalById(professionalId);
      setFormData({
        name: professional.name,
        imageUrl: professional.imageUrl,
        instagramHandle: professional.instagramHandle || '',
        price: professional.price,
        role: professional.role,
        available: professional.available
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching professional details:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price)
      };

      await updateProfessional(professionalId, dataToSubmit);
      onClose(true);
    } catch (error) {
      console.error('Error updating professional:', error);
      alert('Failed to update professional');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Professional</h2>
          <button onClick={() => onClose(false)} className="text-gray-500 hover:text-gray-700 text-4xl">
            ×
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Instagram Handle
              </label>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="@username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-gray-700 text-sm font-bold">Available</span>
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfessional;