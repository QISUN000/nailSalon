import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import SidePanel from "../components/SidePanel";
import ProfessionalCard from "../components/professionalCard";
import Image2 from '../assets/image2.png';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../BookingContext';
import { getAllProfessionals } from '../api/api';

const Professionals = () => {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const { selectedServices, selectedProfessional, setSelectedProfessional } = useBooking();

  const salonInfo = {
    name: "Bicolor Los Feliz",
    image: Image2,
    rating: 5.0,
    reviewCount: 33,
    location: "Central LA, Los Angeles"
  };

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      const professionalsData = await getAllProfessionals();
      setProfessionals(professionalsData);
    } catch (error) {
      console.error('Error loading professionals:', error);
    }
  };

  const handleProfessionalSelect = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleContinue = () => {
    navigate('/booking/selecttime');
  };

  useEffect(() => {
    if (professionals.length > 0 && !selectedProfessional) {
      setSelectedProfessional(professionals[0]);
    }
  }, [professionals, selectedProfessional, setSelectedProfessional]);

  return (
    <div className="relative min-h-screen pb-[200px] md:pb-0">
      <Header
        title="Professionals"
        breadcrumbs={['Services', 'Professional', 'Time', 'Confirm']}
        selectedCrumbs={['Services', 'Professional']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:gap-6">
          <main className="flex-grow">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {professionals.map(professional => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                  isSelected={selectedProfessional?.id === professional.id}
                  onSelect={handleProfessionalSelect}
                />
              ))}
            </div>
          </main>
          <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto bg-white">
            <div className="md:sticky md:top-4">
              <SidePanel
                salonInfo={salonInfo}
                selectedServices={selectedServices}
                selectedProfessional={selectedProfessional}
                onContinue={handleContinue}
                currentPage="selectProfessional"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Professionals;