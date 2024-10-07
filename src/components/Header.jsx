import React from 'react'
import { ChevronLeft } from 'lucide-react';

const Header = ({ title, breadcrumbs,selectedCrumbs = [] }) => (
    
        <>
            <header className='mb-6'>
                <button className="mb-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                {breadcrumbs && (
                    <nav className='text-sm text-gray-500 mb-2'>
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <span className="mx-1">&gt;</span>}
                                <span className={`hover:text-gray-700 cursor-pointer ${selectedCrumbs.includes(crumb) ? 'font-bold text-gray-900' : ''}`}>{crumb}</span>
                            </React.Fragment>
                        ))}
                    </nav>
                )
                }
                <h1 className="text-4xl font-medium ">{title}</h1>
            </header>
        </>
    
);

export default Header