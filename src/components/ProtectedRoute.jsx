import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  
    if (!document.cookie.includes('loggedIn')) {
        return <Navigate to="/" replace />;
    }
    if (!localStorage.getItem('token')) {
            return <Navigate to="/" replace />;
        }

       
        const userRole = localStorage.getItem('userRole');

        console.log('Current userRole:', userRole);  // Check what role we have
        console.log('Allowed roles:', allowedRoles);
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/unauthorizedaccess" replace />;
        }

        return children;
    
};

export default ProtectedRoute;