import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import Header from '../ComponentHeader';
import { getMyAppointments } from '../../api/api.js';
import { format } from 'date-fns';

const AppointmentsCustomer = () => {
  const [appointment, setAppointment] = useState([]);

  const getAppointments = async () => {
    try {
      const data = await getMyAppointments();
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
    { key: 'name', header: 'PROFESSIONAL' },
    { key: 'date', header: 'DATA' },
    { key: 'services', header: 'SERVICES' },
    { key: 'startTime', header: 'START TIME' },
    { key: 'status', header: 'STATUS' },
    { key: 'action', header: 'ACTION' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Header title="Appointments" />
      <div className="p-4">
        <DataTable 
          columns={columns}
          data={appointment}
        />
      </div>
    </div>
  );
};

export default AppointmentsCustomer;