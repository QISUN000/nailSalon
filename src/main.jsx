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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  </StrictMode>
)