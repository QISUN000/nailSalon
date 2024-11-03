# Nail Salon Booking System - Frontend

## Overview
This Nail Salon Booking System is a personal project I created to support my partner, a talented nail technician, in her dream of opening her own nail studio. I wanted to build something that could help her manage appointments and streamline her future business operations, making it easier for clients to connect with her services. This app serves as an all-in-one booking platform where clients can browse the studio's portfolio, book services, and manage their appointments after logging in. Built with React, Spring Boot, and MySQL.

## Live Demo
🚀 Visit the Live Site 
https://nail-salon-navy.vercel.app/

## Demo Video
<video src="https://www.youtube.com/watch?v=X13G5j5pqNE" controls="controls" style="max-width: 730px;">
</video>

## Features
- **Client Portal**
  - Browse studio's work portfolio
  - Book nail services
  - View and manage upcoming appointments
  - User authentication via JWT
  - Interactive service selection
  - Real-time availability checking

- **Admin Dashboard**
  - Manage and oversee bookings
  - Approve/reject appointment requests
  - Update professional information
  - Service management (add/edit/remove)
  - Professional staff management

- **Professional Interface**
  - View booking schedule
  - Manage client appointments
  - Update availability

## Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **Date Handling:** date-fns
- **HTTP Client:** Axios
- **UI Components:**
  - react-datepicker (appointment scheduling)
  - react-slick (image carousels)
  - react-toastify (notifications)
  - lucide-react (icons)
- **Authentication:** @react-oauth/google and JWT
- **Animations:** AOS (Animate on Scroll)

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=your_backend_api_url
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure
```
src/
├── api/
│   └── api.js                 # API service configuration
├── assets/                    # Static assets and images
├── components/               
│   ├── Calendar.jsx           # Appointment calendar component
│   ├── carousel.jsx           # Image carousel for portfolio
│   ├── FullyBooked.jsx        # Fully booked date indicator
│   ├── Header.jsx             # Main navigation header
│   ├── LoginModal.jsx         # Authentication modal
│   ├── professionalCard.jsx   # Staff profile card
│   ├── ProtectedRoute.jsx     # Route protection wrapper
│   ├── ServiceCard.jsx        # Service display card
│   ├── ServiceList.jsx        # Services listing
│   ├── ServiceTabs.jsx        # Service category tabs
│   ├── SidePanel.jsx          # Side navigation panel
│   └── TimeSlots.jsx          # Appointment time selector
├── dashboard/                 # Dashboard components
│   ├── admin/                 # Admin-specific components
│   ├── customers/             # Customer management
│   ├── professionals/         # Staff management
│   ├── AddProfessional.jsx    # Add new staff form
│   ├── Button.jsx             # Reusable button component
│   ├── ComponentHeader.jsx    # Dashboard component headers
│   ├── ConfirmationModal.jsx  # Action confirmation modal
│   ├── DataTable.jsx          # Data display table
│   ├── EditAppointment.jsx    # Appointment editor
│   ├── EditProfessional.jsx   # Staff profile editor
│   ├── Sidebar.jsx           # Dashboard sidebar
│   └── UnauthorizedAccess.jsx # Access denied component
├── layout/
│   ├── layout.jsx            # Main layout wrapper
│   ├── professionals.jsx     # Staff layout
│   ├── selectService.jsx     # Service selection layout
│   └── SelectTime.jsx        # Time selection layout
├── App.css                   # Global styles
├── App.jsx                   # Root component
├── BookingContext.jsx        # Booking state management
└── main.jsx                  # Application entry point
```

## Development Guidelines

### Code Style
- Project uses ESLint for code linting
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Maintain component isolation and reusability

### Authentication
The application provides secure user authentication with multiple sign-in options:
Sign-in Methods

Email/Password Authentication

Traditional email and password registration
Secure password requirements
Password reset functionality


Google OAuth

One-click Google sign-in
Secure OAuth 2.0 implementation
Automatic profile information import



Security Features

JWT (JSON Web Token) based authentication
Secure token storage and management
Automatic session timeout handling
Protected API routes
CORS protection
XSS protection
CSRF protection

Access Control

Role-based authorization (Client/Admin/Professional)
Protected routes based on user roles
Automatic redirect for unauthorized access
Session management and validation

Token Management

Secure JWT storage
Automatic token inclusion in API requests
Token expiration handling
Session persistence across page refreshes

### API Integration
- Axios is used for API calls
- Base URL configuration through environment variables
- Centralized API service structure

## Building for Production

1. Create production build:
```bash
npm run build
# or
yarn build
```

2. Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments
- Create by QI SUN

## Support
For support, please open an issue in the repository or contact lukesun2023@gmail.com.
