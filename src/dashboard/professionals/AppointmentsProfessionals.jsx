import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable'
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
    const [professionalId, setProfessionalId] = useState(null); // Changed to null initial state

    const handleGetProfessionalID = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/professionals/user', {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setProfessionalId(response.data.id);
        } catch (error) {
            console.error('Getting professional Id error', error);
        }
    };

    const handleAppointments = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings/professional/${id}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            
            const formatteddata = response.data.map(e => ({
                id: e.id,
                name: e.customer.name,
                date: format(new Date(e.startTime), 'MMMM dd, yyyy'),
                services: e.services.map(service => service.name).join(', '),
                startTime: format(new Date(e.startTime), 'hh:mm a'),
                status: e.status,
            }));
            
            setAppointments(formatteddata);
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