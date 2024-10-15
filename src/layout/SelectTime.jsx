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

const SelectTime = () => {
    const navigate = useNavigate();
    const { selectedServices, selectedProfessional } = useBooking();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isDateFullyBooked, setIsDateFullyBooked] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState([]);

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
            fetchUnavailableDates(selectedProfessional.id);
        }
    }, [selectedProfessional, navigate]);

    const fetchUnavailableDates = async (professionalId) => {
        try {
            // This is a placeholder. In a real application, you would fetch this data from your backend.
            // For now, let's simulate some unavailable dates
            const unavailableDates = [
                new Date(2024, 9, 1),  // October 1, 2024
                new Date(2024, 9, 5),  // October 5, 2024
                new Date(2024, 9, 10), // October 10, 2024
            ];
            setUnavailableDates(unavailableDates);
        } catch (error) {
            console.error("Error fetching unavailable dates:", error);
            // Handle the error appropriately
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
        setIsLoginModalOpen(true);
    };

    const handleLogin = (method, email) => {
        console.log(`Logged in with ${method}`, email);
        setIsLoginModalOpen(false);
        navigate('/confirm');
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