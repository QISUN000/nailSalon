import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import Header from '../ComponentHeader';
import { getProfessionalId, getProfessionalAppointments } from '../../api/api.js';
import { format } from 'date-fns';

const AppointmentsProfessionals = () => {
  const [appointments, setAppointments] = useState([]);
  const [professionalId, setProfessionalId] = useState(null);

  const columns = [
    { key: 'name', header: 'CUSTOMERS' },
    { key: 'date', header: 'DATA' },
    { key: 'services', header: 'SERVICES' },
    { key: 'startTime', header: 'START TIME' },
    { key: 'status', header: 'STATUS' },
  ];

  const handleGetProfessionalID = async () => {
    try {
      const id = await getProfessionalId();
      setProfessionalId(id);
    } catch (error) {
      console.error('Getting professional Id error', error);
    }
  };

  const handleAppointments = async (id) => {
    try {
      const data = await getProfessionalAppointments(id);
      const formattedData = data.map(e => ({
        id: e.id,
        name: e.customer.name,
        date: format(new Date(e.startTime), 'MMMM dd, yyyy'),
        services: e.services.map(service => service.name).join(', '),
        startTime: format(new Date(e.startTime), 'hh:mm a'),
        status: e.status,
      }));
      setAppointments(formattedData);
    } catch (error) {
      console.error('Getting Appointments error', error);
    }
  };

  // First useEffect to get professional ID
  useEffect(() => {
    handleGetProfessionalID();
  }, []);

  // Second useEffect to get appointments when professionalId changes
  useEffect(() => {
    if (professionalId) {
      handleAppointments(professionalId);
    }
  }, [professionalId]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Header title="Appointments" />
      <div className="p-4">
        <DataTable 
          columns={columns}
          data={appointments}
        />
      </div>
    </div>
  );
};

export default AppointmentsProfessionals;