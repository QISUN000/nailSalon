import React, { useEffect, useState } from 'react';
import Header from '../ComponentHeader'
import DataTable from '../DataTable'
import axios from 'axios';
import { toast } from 'react-toastify';
import AddProfessional from '../AddProfessional';
import EditProfessional from '../EditProfessional';

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);
  // Add these new states for confirmation modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [professionalToDelete, setProfessionalToDelete] = useState(null);

  const columns = [
    { key: 'name', header: 'NAME' },
    { key: 'price', header: 'PRICE' },
    { key: 'email', header: 'EMAIL' },
    { key: 'role', header: 'ROLE' },
    { key: 'imageUrl', header: 'imageUrl' },
    { key: 'action', header: 'ACTION' },
  ];

  const getProfessionals = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/professionals');

      const formattedProfessionals = response.data.map(e => ({
        id: e.id,
        name: e.name,
        price: e.price ?? 0,
        email: e?.user?.email ?? '-',
        role: e.role ?? '-',
        imageUrl: e.imageUrl ?? null
      }));

      setProfessionals(formattedProfessionals);
    } catch (error) {
      console.log('error fetching Professionals', error);
      toast.error('Failed to fetch professionals');
    }
  };

  useEffect(() => {
    getProfessionals();
  }, []);

  const handleAddProfessional = () => {
    setShowAddModal(true);
  };

  const handleEdit = (id) => {
    setSelectedProfessionalId(id);
    setShowEditModal(true);
  };

  // Modified delete handler to show confirmation modal
  const handleDelete = (id) => {
    setProfessionalToDelete(id);
    setIsConfirmOpen(true);
  };

  // New confirm delete handler
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/professionals/${professionalToDelete}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
      toast.success('Professional deleted successfully');
      getProfessionals(); // Refresh the list
    } catch (error) {
      console.error('Error deleting professional:', error);
      toast.error('Failed to delete professional');
    }
    setIsConfirmOpen(false);
    setProfessionalToDelete(null);
  };

  const actions = [
    { label: 'EDIT', onClick: handleEdit, variant: 'primary' },
    { label: 'DELETE', onClick: handleDelete, variant: 'secondary' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Header
        title="Professionals"
        onAdd={handleAddProfessional}
        addButtonText="ADD"
        addButtonVariant="primary"
      />
      <DataTable
        columns={columns}
        data={professionals}
        actions={actions}
      />

      <AddProfessional
        isOpen={showAddModal}
        onClose={(shouldRefresh) => {
          setShowAddModal(false);
          if (shouldRefresh) {
            getProfessionals();
            toast.success('Professional added successfully');
          }
        }}
      />

      <EditProfessional
        isOpen={showEditModal}
        onClose={(shouldRefresh) => {
          setShowEditModal(false);
          setSelectedProfessionalId(null);
          if (shouldRefresh) {
            getProfessionals();
            toast.success('Professional updated successfully');
          }
        }}
        professionalId={selectedProfessionalId}
      />

      {/* Confirmation Modal Component */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isConfirmOpen ? '' : 'hidden'}`}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this professional?</h2>
          <div className="flex justify-end gap-4">
            <button 
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={() => {
                setIsConfirmOpen(false);
                setProfessionalToDelete(null);
              }}
            >
              No
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={confirmDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsPage;