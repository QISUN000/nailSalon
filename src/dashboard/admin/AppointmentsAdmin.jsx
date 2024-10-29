import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import Header from '../ComponentHeader';
import EditAppointment from '../EditAppointment';
import { getAllAppointments, cancelAppointment } from '../../api/api.js';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const AppointmentsAdmin = () => {
  const [appointment, setAppointment] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleEdit = (id) => {
    setSelectedAppointmentId(id);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = (wasUpdated) => {
    setIsEditModalOpen(false);
    setSelectedAppointmentId(null);
    if (wasUpdated) {
      getAppointments();
    }
  };

  const getAppointments = async () => {
    try {
      const data = await getAllAppointments();
      const formattedAppointments = data.map(e => ({
        id: e.id,
        name: e.professional.name,
        date: format(new Date(e.startTime), 'MMMM dd, yyyy'),
        services: e.services.map(service => service.name).join(', '),
        startTime: format(new Date(e.startTime), 'hh:mm a'),
        status: e.status,
      }));
      setAppointment(formattedAppointments);
    } catch (error) {
      console.log('error fetching appointments', error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    { key: 'name', header: 'Professional' },
    { key: 'date', header: 'DATA' },
    { key: 'services', header: 'SERVICES' },
    { key: 'startTime', header: 'START TIME' },
    { key: 'status', header: 'STATUS' },
    { key: 'action', header: 'ACTION' },
  ];

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      toast.success('Successfully cancelled.');
      getAppointments();
    } catch (error) {
      console.log('cancel error', error);
    }
  };

  const actions = [
    { label: 'Edit', onClick: handleEdit, variant: 'primary' },
    { label: 'Cancel', onClick: handleCancel, variant: 'secondary' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Header title="Appointments" />
      <div className="p-4">
        <DataTable 
          columns={columns}
          data={appointment}
          actions={actions}
        />
      </div>
      <EditAppointment
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        appointmentId={selectedAppointmentId}
      />
    </div>
  );
};

export default AppointmentsAdmin;