import React from 'react';
import Button from './Button';

const ComponentHeader = ({ 
  title, 
  onAdd, 
  addButtonText = 'ADD',
  addButtonVariant = 'primary'
}) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white border-b">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      {onAdd && (
        <Button 
          variant={addButtonVariant}
          onClick={onAdd}
        >
          {addButtonText}
        </Button>
      )}
    </div>
  );
};

export default ComponentHeader;