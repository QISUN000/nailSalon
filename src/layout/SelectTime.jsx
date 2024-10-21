import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../BookingContext';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import TimeSlots from '../components/TimeSlots';
import FullyBookedMessage from '../components/FullyBooked';
import SidePanel from '../components/SidePanel';
import LoginModal from '../components/LoginModal';
import Image2 from '../assets/image2.png';
import { createBooking, fetchUnavailableDates } from '../api/api';
import { toast } from 'react-toastify';

const SelectTime = () => {
    const navigate = useNavigate();
    const { selectedServices, selectedProfessional } = useBooking();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isDateFullyBooked, setIsDateFullyBooked] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const salonInfo = {
        name: "Bicolor Los Feliz",
        image: Image2,
        rating: 5.0,
        reviewCount: 40,
        location: "Central LA, Los Angeles"
    };

    useEffect(() => {
        if (!selectedProfessional) {
            navigate('/layout/professionals');
        } else {
            loadUnavailableDates();
        }
        checkLoginStatus();
    }, [selectedProfessional, navigate]);

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    const loadUnavailableDates = async () => {
        try {
            const dates = await fetchUnavailableDates(selectedProfessional.id);
            setUnavailableDates(dates);
        } catch (error) {
            console.error("Error fetching unavailable dates:", error);
            toast.error("Failed to load unavailable dates. Please try again.");
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
        setIsDateFullyBooked(Math.random() < 0.3); // Simulating a check for fully booked dates
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleContinue = () => {
        if (isLoggedIn) {
            handleBookingCreation();
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleLogin = (method, email, token, role) => {
        console.log(`Logged in with ${method}`, email);
        setIsLoginModalOpen(false);
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        handleBookingCreation();
    };

    const handleBookingCreation = async () => {
        try {
            const bookingData = {
                services: selectedServices.map(service => service.id),
                professionalId: selectedProfessional.id,
                date: selectedDate,
                time: selectedTime
            };
            const response = await createBooking(bookingData);
            toast.success('Booking created successfully!');
            navigate('/booking-info', { state: { bookingId: response.id } });
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Failed to create booking. Please try again.');
        }
    };

    if (!selectedProfessional) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header
                title="Select time"
                breadcrumbs={['Services', 'Professional', 'Time', 'Confirm']}
                selectedCrumbs={['Services', 'Professional', 'Time']}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6">
                    <main className="flex-grow">
                        <div className="flex items-center mb-4">
                            <img
                                src={`http://localhost:8080${selectedProfessional.imageUrl}`}
                                alt={selectedProfessional.name}
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span>{selectedProfessional.name}</span>
                        </div>
                        <Calendar
                            onDateSelect={handleDateSelect}
                            selectedDate={selectedDate}
                            unavailableDates={unavailableDates}
                        />
                        {selectedDate && (
                            isDateFullyBooked ? (
                                <FullyBookedMessage professionalName={selectedProfessional.name} />
                            ) : (
                                <TimeSlots onTimeSelect={handleTimeSelect} selectedTime={selectedTime} />
                            )
                        )}
                    </main>
                    <aside className="w-80">
                        <SidePanel
                            salonInfo={salonInfo}
                            selectedServices={selectedServices}
                            selectedProfessional={selectedProfessional}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onContinue={handleContinue}
                            currentPage="selectTime"
                        />
                    </aside>
                </div>
            </div>
            <LoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        </div>
    );
};

export default SelectTime;