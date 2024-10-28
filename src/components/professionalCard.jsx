import React from 'react';

const ProfessionalCard = ({ professional, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:shadow'
      }`}
      onClick={() => onSelect(professional)}
    >
      <div className="flex flex-col items-center">
        <img 
          src={`http://localhost:8080${professional.imageUrl}`} 
          alt={professional.name} 
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <h3 className="font-medium text-lg">{professional.name}</h3>
        {professional.role && <p className="text-sm text-gray-500">{professional.role}</p>}
        {professional.instagramHandle && (
          <p className="text-sm text-blue-500">Instagram: {professional.instagramHandle}</p>
        )}
        <p className="mt-2">from ${professional.price}</p>
      </div>
    </div>
  );
};

export default ProfessionalCard;