import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors duration-200 ease-in-out";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button 
      className={buttonStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;