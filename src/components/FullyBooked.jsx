import React from 'react';

const FullyBookedMessage = ({ professionalName }) => {
  return (
    <div className="text-center py-8">
    
      <h3 className="text-lg font-semibold mb-2">{professionalName} is fully booked on this date</h3>
      <p className="text-gray-600 mb-4">Available from Wed, Oct 16</p>
      <div className="space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100">
          Go to next available date
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100">
          Check all professionals
        </button>
      </div>
      <p className="mt-4 text-blue-600">You can join the waitlist instead.</p>
    </div>
  );
};

export default FullyBookedMessage;