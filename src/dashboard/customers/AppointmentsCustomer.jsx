import React from 'react';
import DataTable  from '../DataTable'
import Header from '../ComponentHeader'


const AppointmentsCustomer = () => {
    
    const columns = [
        { key: 'name', header: 'CUSTOMERS' },
        { key: 'date', header: 'DATA' },
        { key: 'services', header: 'SERVICES' },
        { key: 'startTime', header: 'START TIME' },
        { key: 'status', header: 'STATUS' },
        { key: 'action', header: 'ACTION' },
      ];
    
      const appointments = [
        { id: 1, name: 'Name', date: 'JUNE 21, 2024', services: 'Haircut', startTime: '10:00 AM', status: 'APPROVED' },
        { id: 2, name: 'Name', date: 'JUNE 22, 2024', services: 'Coloring', startTime: '2:00 PM', status: 'REQUESTED' },
        // Add more appointments as needed
      ];
    
      const handleAddAppointment = () => {
        console.log('Add appointment');
        // Implement add appointment functionality
      };
    
      const handleApprove = (id) => {
        console.log('Approve appointment', id);
        // Implement approve functionality
      };
    
      const handleRemove = (id) => {
        console.log('Remove appointment', id);
        // Implement remove functionality
      };
    
      const actions = [
        { label: 'APPROVE', onClick: handleApprove, variant: 'primary' },
        { label: 'REMOVE', onClick: handleRemove, variant: 'secondary' },
      ];

  return (
    
    

    <div className="bg-white shadow rounded-lg p-6">
          <Header 
          title="Appointments" 
          
        />
      <div className="p-4">
        <DataTable 
          columns={columns}
        data={appointments}
      
        />
      </div>
    </div>
  );
};

export default AppointmentsCustomer;