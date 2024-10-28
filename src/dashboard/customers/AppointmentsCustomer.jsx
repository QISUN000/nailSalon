import React, { useEffect, useState } from 'react';
import DataTable  from '../DataTable'
import Header from '../ComponentHeader'
import axios from 'axios';
import { format } from 'date-fns'; 


const AppointmentsCustomer = () => {
  const [appointment, setAppointment] = useState([]);

  useEffect(()=>{
    const getAppointments = async ()=>{
      try {
        const response = await axios.get('http://localhost:8080/api/bookings/my-bookings',{
          headers:{
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
        
      
        const formattedAppointments = response.data.map(e =>({
          id:e.id,
          name: e.professional.name,
          date: format(new Date(e.startTime), 'MMMM dd, yyyy'),
           services: e.services.map(service => service.name).join(', '),
                    startTime: format(new Date(e.startTime), 'hh:mm a'),
                    status: e.status,

        }))

        setAppointment(formattedAppointments);
      } catch (error) {
        console.log('error fetching appointments',error)
      }
    };
    getAppointments();
  },[]);

    const columns = [
        { key: 'name', header: 'PROFESSIONAL' },
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
    
    

  return (
    
    

    <div className="bg-white shadow rounded-lg p-6">
          <Header 
          title="Appointments" 
          
        />
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