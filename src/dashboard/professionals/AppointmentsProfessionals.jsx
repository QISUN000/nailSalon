import React, { useEffect, useState } from 'react';
import DataTable  from '../DataTable'
import Header from '../ComponentHeader'
import axios from 'axios';
import { format } from 'date-fns'; 

const AppointmentsProfessionals = () => {
    
    const columns = [
        { key: 'name', header: 'CUSTOMERS' },
        { key: 'date', header: 'DATA' },
        { key: 'services', header: 'SERVICES' },
        { key: 'startTime', header: 'START TIME' },
        { key: 'status', header: 'STATUS' },
        
      ];
    
      const [appointments, setAppointments] = useState([]);
      const [professionalId, setProfessionalId] = useState([]);

      const handleGetProfessionalID = async ()=>{
        try {
          const response = await axios.get('http://localhost:8080/api/professionals/user',{
            headers: {
              'Authorization':`${localStorage.getItem('token')}`
            }
          })
          setProfessionalId(response.data.id)
          console.log('professionalId',professionalId)
        } catch (error) {
          console.log('Getting professional Id error',error)
        }
      }
      useEffect(()=>{
        handleGetProfessionalID()
        handleAppointments()
      },[]);

      const handleAppointments = async ()=>{
        try {
          const response = await axios.get(`http://localhost:8080/api/bookings/professional/${professionalId}`,{
            headers: {
              'Authorization':`${localStorage.getItem('token')}`
            }
          });
          const formatteddata = response.data.map(e=>({
            id:e.id,
            name: e.customer.name,
            startTime : e.startTime,
            status: e.status,  
            date: format(new Date(e.startTime), 'MMMM dd, yyyy'),
             services: e.services.map(service => service.name).join(', '),
                      startTime: format(new Date(e.startTime), 'hh:mm a'),
                      status: e.status,
          }))
          setAppointments(formatteddata);
        } catch (error) {
          console.log('Getting Appointments error',error)
        }
      }
    

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

export default AppointmentsProfessionals;