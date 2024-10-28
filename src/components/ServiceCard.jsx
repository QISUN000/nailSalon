import React, { useState } from 'react';
import { Check } from 'lucide-react';

const ServiceCard = ({ service, isSelected, onSelect }) => {
  const { name, description, price, duration } = service;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e) => {
    if (!e.target.closest('button')) {
      onSelect(service);
    }
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`p-4 border rounded-lg mb-4 transition-all cursor-pointer
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:shadow'}
      `}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow pr-4">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{duration} mins</p>
          <p className={`text-sm mt-2 text-gray-700 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {description}
          </p>
          {description.length > 100 && (
            <button 
              className="text-blue-500 text-sm mt-1"
              onClick={handleExpandClick}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-500 mb-1">from ${price}</p>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center
            ${isSelected ? 'bg-blue-500 text-white' : 'border border-gray-300 text-transparent'}
          `}>
            <Check size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;