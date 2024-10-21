import React, { useState, useEffect } from 'react';
import { Home, Users } from 'lucide-react';
import Image2 from '../assets/image2.png';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage, onPageChange, userRole }) => {
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await fetch('/api/admin-name');
        if (!response.ok) throw new Error('Failed to fetch admin name');
        const data = await response.json();
        setAdminName(data.name);
      } catch (error) {
        console.error('Error fetching admin name:', error);
        setAdminName('Admin');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminName();
  }, []);

  const allMenuItems = [
    { icon: Home, text: 'Appointments', roles: ['admin', 'customer','professional'] },
    { icon: Users, text: 'Professionals', roles: ['admin'] }
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  const navigate = useNavigate();

  return (
    <aside className="bg-white shadow-md flex flex-col h-full">
      <div className="flex items-center p-4 bg-white mt-2">
        <button 
          className="text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold ml-2">Nail Salon</h1>
      </div>
      <nav className="flex-grow">
        <ul className="p-4 space-y-2">
          {menuItems.map(({ icon: Icon, text }) => (
            <li 
              key={text}
              onClick={() => onPageChange(text)}
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-150 ease-in-out
                ${activePage === text 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {text}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <img src={Image2} alt="Admin" className="w-8 h-8 rounded-full mr-2" />
          {loading ? (
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          ) : (
            <span className="text-sm text-gray-600">{adminName}</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;