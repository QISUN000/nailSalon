# Nail Salon Booking System - Frontend

## Overview
This Nail Salon Booking System is a personal project I created to support my partner, a talented nail technician, in her dream of opening her own nail studio. I wanted to build something that could help her manage appointments and streamline her future business operations, making it easier for clients to connect with her services. This app serves as an all-in-one booking platform where clients can browse the studio's portfolio, book services, and manage their appointments after logging in. Built with React, Spring Boot, and MySQL.

##Live Demo
🚀 Visit the Live Site 
https://qisun.lol/

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
├── components/         # Reusable UI components
├── pages/             # Page components/routes
├── services/          # API service calls
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── assets/            # Static assets
├── styles/            # Global styles
└── App.jsx            # Root component
```

## Development Guidelines

### Code Style
- Project uses ESLint for code linting
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Maintain component isolation and reusability

### Authentication
The application uses Google OAuth for authentication:
1. Sign in with Google button implementation
2. JWT token management for session handling
3. Protected routes for authenticated users

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
- Special thanks to all contributors

## Support
For support, please open an issue in the repository or contact lukesun2023@gmail.com.
