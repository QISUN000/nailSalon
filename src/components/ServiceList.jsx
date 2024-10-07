import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ categories, selectedServices, onServiceSelect }) => {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id} id={category.name}>
          <h2 className="text-2xl font-medium mb-4">{category.name}</h2>
          {category.services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              isSelected={selectedServices.some(s => s.id === service.id)}
              onSelect={onServiceSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;