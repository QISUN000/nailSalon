import React, { useState, useEffect } from 'react';
import { Home, Users,LogOut } from 'lucide-react';
import Image2 from '../assets/image2.png';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserName,api } from '../api/api';

const Sidebar = ({ activePage, onPageChange, userRole }) => {
const [Name, setName] = useState('');
const [email, setEmail] = useState('');
const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem('token');

    console.log('Initial token loaded:', token); // Debug log


  useEffect(() => {
    const fetchUserData = async () => {
        // Check if user is authenticated by checking if the token exists
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (!token) {
            console.log('User not authenticated');
            // Optionally, redirect the user to the login page if not authenticated
            return; // Exit early if not authenticated
        }

        try {
            // Fetch user data if authenticated
            const userResponse = await getUserName();
            localStorage.setItem('userData', JSON.stringify(userResponse.data));
            const userData = JSON.parse(localStorage.getItem('userData'));
            const { name, email, createdAt } = userData;
            setName(name);
            setEmail(email);
            setCreatedAt(createdAt);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, []);

const handleLogout = ()=>{
  localStorage.clear();
  navigate('/')
}

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
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src={Image2} alt="Admin" className="w-8 h-8 rounded-full mr-2" />
              <span className="text-xl font-medium text-gray-600">{Name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
          <div className="text-base text-gray-500">{email}</div>
          <div className="text-sm text-gray-400">Member since: {createdAt}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;