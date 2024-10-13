import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, breadcrumbs, selectedCrumbs = [] }) => {
    const navigate = useNavigate();

    const handleNavigation = (crumb) => {
        const currentStep = selectedCrumbs[selectedCrumbs.length - 1];
        
        switch(crumb) {
            case 'Services':
                navigate('/layout');
                break;
            case 'Professional':
                if (currentStep === 'Professional' || currentStep === 'Time' || currentStep === 'Confirm') {
                    navigate('/layout/professionals');
                }
                break;
            case 'Time':
                if (currentStep === 'Time' || currentStep === 'Confirm') {
                    navigate('/layout/time');
                }
                break;
            case 'Confirm':
                if (currentStep === 'Confirm') {
                    navigate('/layout/confirm');
                }
                break;
            default:
                console.log(`No navigation defined for ${crumb}`);
        }
    };

    const isCrumbClickable = (crumb) => {
        const currentStep = selectedCrumbs[selectedCrumbs.length - 1];
        const steps = ['Services', 'Professional', 'Time', 'Confirm'];
        return steps.indexOf(crumb) <= steps.indexOf(currentStep);
    };

    return (
        <header className='mb-6'>
            <button 
                className="mb-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => navigate(-1)}
            >
                <ChevronLeft size={24} />
            </button>
            {breadcrumbs && (
                <nav className='text-sm text-gray-500 mb-2'>
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span className="mx-1">&gt;</span>}
                            <span 
                                className={`
                                    ${isCrumbClickable(crumb) ? 'hover:text-gray-700 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}
                                    ${selectedCrumbs.includes(crumb) ? 'font-bold text-gray-900' : ''}
                                `}
                                onClick={() => isCrumbClickable(crumb) && handleNavigation(crumb)}
                            >
                                {crumb}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>
            )}
            <h1 className="text-4xl font-medium">{title}</h1>
        </header>
    );
};

export default Header;