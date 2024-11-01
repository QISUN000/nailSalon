import React from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { API_URL_images } from '../api/api';

const SidePanel = ({ salonInfo, selectedServices, selectedProfessional, selectedDate, selectedTime, onContinue, currentPage }) => {
  const servicePrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const professionalPrice = selectedProfessional ? selectedProfessional.price : 0;
  const totalPrice = Math.max(servicePrice, professionalPrice);

  const totalDuration = selectedServices.reduce((sum, service) => {
    const [minDuration] = service.duration.split(' - ');
    return sum + parseInt(minDuration);
  }, 0);

  const isButtonDisabled = () => {
    if (currentPage === 'selectService') return selectedServices.length === 0;
    if (currentPage === 'selectProfessional') return !selectedProfessional;
    if (currentPage === 'selectTime') return !selectedDate || !selectedTime;
    return false;
  };

  return (
    <div className="bg-white shadow-md md:rounded-lg overflow-hidden">
      <div className="p-4 hidden md:block">
        <div className="flex items-center mb-4">
          <img src={salonInfo.image} alt={salonInfo.name} className="w-12 h-12 rounded-full mr-3" />
          <div>
            <h3 className="font-semibold">{salonInfo.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm ml-1">{salonInfo.rating} ({salonInfo.reviewCount})</span>
            </div>
            <p className="text-sm text-gray-500">{salonInfo.location}</p>
          </div>
        </div>

        {selectedDate && selectedTime && (
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Selected Time</h4>
            <p className="text-sm">{format(selectedDate, 'EEEE d MMMM')}</p>
            <p className="text-sm">{selectedTime}</p>
          </div>
        )}

        {selectedServices.length > 0 && (
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Selected Services</h4>
            {selectedServices.map(service => (
              <div key={service.id} className="mb-2">
                <p className="text-sm">{service.name}</p>
                <p className="text-sm text-gray-500">{service.duration} mins • ${service.price}</p>
              </div>
            ))}
          </div>
        )}

        {selectedProfessional && (
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Selected Professional</h4>
            <div className="flex items-center">
              <img 
                src={API_URL_images + selectedProfessional.imageUrl}
                alt={selectedProfessional.name} 
                className="w-10 h-10 rounded-full object-cover mr-2"
              />
              <div>
                <p className="text-sm font-medium">{selectedProfessional.name}</p>
                <p className="text-sm text-gray-500">{selectedProfessional.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">from ${totalPrice}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} • 
          {totalDuration} mins - {totalDuration + 30} mins
        </p>
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onContinue}
          disabled={isButtonDisabled()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SidePanel;