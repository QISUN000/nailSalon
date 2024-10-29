import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../BookingContext';
import ServiceTabs from "../components/ServiceTabs";
import ServiceList from "../components/ServiceList";
import SidePanel from "../components/SidePanel";
import { getCategories } from '../api/api';
import Image2 from '../assets/image2.png';

const SelectService = () => {
  const navigate = useNavigate();
  const { selectedServices, setSelectedServices } = useBooking();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  
  const salonInfo = {
    name: "Bicolor Los Feliz",
    image: Image2,
    rating: 5.0,
    reviewCount: 33,
    location: "Central LA, Los Angeles"
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      console.log(categoriesData);
      setCategories(categoriesData);
      setActiveCategory(categoriesData[0]?.name || '');
    } catch (error) {
      console.error("Error loading categories:", error);
      // You might want to add error handling UI here
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedServices(prevSelected => {
      const isAlreadySelected = prevSelected.some(s => s.id === service.id);
      if (isAlreadySelected) {
        return prevSelected.filter(s => s.id !== service.id);
      } else {
        return [...prevSelected, service];
      }
    });
  };

  const handleContinue = () => {
    navigate('/booking/professionals');
  };

  return (
    <div>
      <Header
        title="Select services"
        breadcrumbs={['Services', 'Professional', 'Time', 'Confirm']}
        selectedCrumbs={['Services']}
      />
      <ServiceTabs
        categories={categories.map(cat => cat.name)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="py-6 flex gap-6">
        <main className="flex-grow">
          <ServiceList 
            categories={categories} 
            selectedServices={selectedServices}
            onServiceSelect={handleServiceSelect}
          />
        </main>
        <aside className="md:w-80 fixed bottom-0 left-0 right-0 md:static">
          <div className="md:sticky md:top-4">
            <SidePanel 
              salonInfo={salonInfo}
              selectedServices={selectedServices}
              onContinue={handleContinue}
              currentPage="selectService"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SelectService;