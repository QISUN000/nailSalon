import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const EditAppointmentModal = ({ isOpen, onClose, appointmentId }) => {
    const [professionals, setProfessionals] = useState([]);
    const [serviceCategories, setServiceCategories] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        if (isOpen && appointmentId) {
            const loadData = async () => {
                await fetchProfessionals();  // Load professionals first
                await fetchAppointmentDetails();  // Then load appointment
                await fetchServices();
            };
            loadData();
        }
    }, [isOpen, appointmentId]);

    const fetchAppointmentDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/bookings/${appointmentId}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            const appointment = response.data;
            console.log('Full appointment data:', appointment);

            setSelectedProfessional(appointment.professional.id);
            setSelectedServices(appointment.services.map(service => service.id));
            setStartTime(new Date(appointment.startTime));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointment details:', error);
            setLoading(false);
        }
    };

    const fetchProfessionals = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/professionals', {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setProfessionals(response.data);
        } catch (error) {
            console.error('Error fetching professionals:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setServiceCategories(response.data);

            // Initialize expanded state for all categories
            const expanded = {};
            response.data.forEach(category => {
                expanded[category.id] = false;
            });
            setExpandedCategories(expanded);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                professionalId: parseInt(selectedProfessional),
                serviceIds: selectedServices.map(id => parseInt(id)),
                startTime: startTime.toISOString()
            };

            await axios.put(`http://localhost:8080/api/bookings/${appointmentId}`, updateData, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            onClose(true);
        } catch (error) {
            console.error('Error updating appointment:', error);
            alert('Failed to update appointment');
        }
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleServiceToggle = (serviceId) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Appointment</h2>
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
                                Professional
                            </label>
                            <select
                                value={selectedProfessional}
                                onChange={(e) => setSelectedProfessional(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Professional</option>
                                {professionals.map(prof => (
                                    <option key={prof.id} value={prof.id}>
                                        {prof.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Services
                            </label>
                            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
                                {serviceCategories.map(category => (
                                    <div key={category.id} className="mb-2">
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(category.id)}
                                            className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
                                        >
                                            <span className="mr-2">
                                                {expandedCategories[category.id] ?
                                                    <MdKeyboardArrowDown className="text-xl" /> :
                                                    <MdKeyboardArrowRight className="text-xl" />
                                                }
                                            </span>
                                            <span className="font-medium">{category.name}</span>
                                        </button>

                                        {expandedCategories[category.id] && (
                                            <div className="ml-6 mt-1">
                                                {category.services.map(service => (
                                                    <div key={service.id} className="flex items-center mb-1 p-2 hover:bg-gray-50">
                                                        <input
                                                            type="checkbox"
                                                            id={`service-${service.id}`}
                                                            checked={selectedServices.includes(service.id)}
                                                            onChange={() => handleServiceToggle(service.id)}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`service-${service.id}`} className="flex-1">
                                                            <div>{service.name}</div>
                                                            <div className="text-sm text-gray-500">
                                                                ${service.price} - {service.duration} mins
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Date and Time
                            </label>
                            <DatePicker
                                selected={startTime}
                                onChange={date => setStartTime(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
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

export default EditAppointmentModal;