import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const customerDashboard = () => {
 

  const [activePage, setActivePage] = useState('Appointments');
  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === 'Appointments') {
      navigate('/admin');
    } else if (page === 'Professionals') {
      navigate('/admin/professionals');
    }
  };

  // Set active page based on current route
  React.useEffect(() => {
    if (location.pathname === '/admin') {
      setActivePage('Appointments');
    } else if (location.pathname === '/admin/professionals') {
      setActivePage('Professionals');
    }
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-100">
    {/* Sidebar */}
    
    <Sidebar activePage={activePage}  userRole={'customer'} />
    

    {/* Main content */}
    <div className="flex-1 flex flex-col">
      {/* Back navigation */}
      

      {/* Appointments content */}
      <div className="flex-1 overflow-y-auto">
        {/* Appointments header */}
      

        {/* Placeholder for the appointments table */}
        <div className="p-4">
        <Outlet />
        </div>
      </div>
    </div>
  </div>
  );
};

export default customerDashboard;
