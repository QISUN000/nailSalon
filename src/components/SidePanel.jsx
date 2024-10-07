import React from 'react';
import { Star } from 'lucide-react';

const SidePanel = ({ salonInfo, selectedServices, onContinue }) => {
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => {
    const [minDuration] = service.duration.split(' - ');
    return sum + parseInt(minDuration);
  }, 0);

  return (
    <div className="bg-white shadow-md md:rounded-lg overflow-hidden">
      <div className="p-4">
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

        {selectedServices.length > 0 && (
          <div className="border-t pt-4 mb-4">
            <h4 className="font-semibold mb-2">Selected Services</h4>
            {selectedServices.map(service => (
              <div key={service.id} className="mb-2">
                <p className="text-sm">{service.name}</p>
                <p className="text-sm text-gray-500">{service.duration} • US${service.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">from US${totalPrice}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{selectedServices.length} service • {totalDuration} mins - {totalDuration + 30} mins</p>
        <button
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SidePanel;