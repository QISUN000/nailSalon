import React from 'react'
import { Link } from 'react-scroll';

const ServiceTabs = ({ categories, activeCategory, onCategoryChange, selectedServicesCount }) => {
    return (
        <div className="relative mb-4">
            <div className="flex justify-between">
                {categories.map((category, index) => (
                    <Link
                        spy={true}
                        smooth={true}
                        key={index}
                        to={category}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer ${activeCategory === category
                                ? 'bg-black text-white'
                                : 'text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => onCategoryChange(category)}
                    >{category}</Link>
                ))}
            </div>
            {selectedServicesCount > 0 && (
                <div className="absolute top-full right-0 mt-2 bg-white px-2 py-1 rounded-full text-xs text-blue-600 border border-blue-200">
                    {selectedServicesCount} selected service{selectedServicesCount > 1 ? 's' : ''} ↑
                </div>
            )}
        </div>
    )
}

export default ServiceTabs;