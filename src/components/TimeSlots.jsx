import React from 'react';

const TimeSlots = ({ onTimeSelect, selectedTime }) => {
  const timeSlots = [
    '12:40 p.m.', '1:25 p.m.', '1:35 p.m.', '1:45 p.m.', '1:55 p.m.',
    '2:05 p.m.', '2:15 p.m.', '2:25 p.m.', '2:35 p.m.', '2:45 p.m.',
    '2:55 p.m.', '3:05 p.m.'
  ];

  return (
    <div className="grid grid-cols-1 gap-2 mt-6">
      {timeSlots.map(time => (
        <button
          key={time}
          onClick={() => onTimeSelect(time)}
          className={`p-3 text-left border rounded-lg ${
            selectedTime === time 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlots;