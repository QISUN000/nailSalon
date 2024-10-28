import React, { useEffect, useState } from 'react'
import Header from "../components/Header"
import SidePanel from "../components/SidePanel"
import ProfessionalCard from "../components/professionalCard"
import axios from "axios"
import Image2 from '../assets/image2.png'
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../BookingContext';

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
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/professionals");
    const professionalsData = result.data;
    setProfessionals(professionalsData);
  }

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

    <div>
      <Header
        title="Professionals"
        breadcrumbs={['Services', 'Professional', 'Time', 'Confirm']}
        selectedCrumbs={['Services', 'Professional']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
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
          <aside className="w-80 hidden md:block">
            <div className="sticky top-4">
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
  )
}

export default Professionals