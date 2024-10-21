import React from 'react';
import Header from '../ComponentHeader'
import DataTable  from '../DataTable'

const ProfessionalsPage = () => {

    const columns = [
        { key: 'name', header: 'NAME' },
        { key: 'price', header: 'PRICE' },
        { key: 'role', header: 'ROLE' },
        { key: 'action', header: 'ACTION' },
      ];
    
      const professionals = [
        { id: 1, name: 'Name', price: '$100', role: 'Stylist' },
        { id: 2, name: 'Name', price: '$120', role: 'Colorist' },
        // Add more professionals as needed
      ];
    
      const handleAddProfessional = () => {
        console.log('Add professional');
        // Implement add professional functionality
      };
    
      const handleEdit = (id) => {
        console.log('Edit professional', id);
        // Implement edit functionality
      };
    
      const handleDelete = (id) => {
        console.log('Delete professional', id);
        // Implement delete functionality
      };
    
      const actions = [
        { label: 'EDIT', onClick: handleEdit, variant: 'primary' },
        { label: 'DELETE', onClick: handleDelete, variant: 'secondary' },
      ];

      
    const handleAddAppointment = () => {
        // Implement add appointment functionality
        console.log('Add appointment');
      };
  return (
    <div className="bg-white shadow rounded-lg p-6">
       <Header 
          title="Professionals" 
          onAdd={handleAddAppointment}
          addButtonText="ADD"
          addButtonVariant="primary"
        />
         <DataTable 
        columns={columns}
        data={professionals}
        actions={actions}
      />
    </div>
  );
};

export default ProfessionalsPage;