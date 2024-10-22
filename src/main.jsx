import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/layout.jsx'
import SelectService from './layout/selectService.jsx'
import Professionals from './layout/professionals.jsx';
import { BookingProvider } from './BookingContext';
import SelectTime from './layout/SelectTime.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminDashboard from './dashboard/admin/AdminDashboard.jsx'
import AppointmentsAdmin from './dashboard/admin/AppointmentsAdmin.jsx'
import ProfessionalsAdmin from './dashboard/admin/ProfessionalsAdmin.jsx'
import CustomerDashboard from './dashboard/customers/customerDashboard.jsx'
import AppointmentsCustomer from './dashboard/customers/AppointmentsCustomer.jsx'
import ProfessionalsDashboard from './dashboard/professionals/ProfessionalsDashboard.jsx'
import AppointmentsProfessionals from './dashboard/professionals/AppointmentsProfessionals.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/customer",
    element: <CustomerDashboard />,
    children: [
      {
        index: true,
        element: <AppointmentsCustomer />
      },
    ]
  },
  {
    path: "/professional",
    element: <ProfessionalsDashboard />,
    children: [
      {
        index: true,
        element: <AppointmentsProfessionals />
      },
    ]
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AppointmentsAdmin />
      },
      {
        path: "professionals",
        element: <ProfessionalsAdmin />,
      },
    ]
  },
  {
    path: "/layout",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SelectService />
      },
      {
        path: "professionals",
        element: <Professionals />,
      },
      {
        path: "selecttime",
        element: <SelectTime />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="893443404226-p3je197e46vbj5itdum0nfqi2jsv4qgo.apps.googleusercontent.com">
    <BookingProvider>
        <>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={3}
          />
        </>
      </BookingProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)