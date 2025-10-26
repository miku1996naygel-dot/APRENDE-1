
import React, { ReactNode } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', variant = 'primary' }) => {
    const { isHighContrast, fontSize } = useAccessibility();

    const baseClasses = `font-bold rounded-full transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4`;
    
    let variantClasses = '';
    switch (variant) {
        case 'secondary':
            variantClasses = isHighContrast
                ? 'bg-yellow-400 text-black focus:ring-yellow-300 py-3 px-8'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 py-3 px-8';
            break;
        case 'icon':
            variantClasses = isHighContrast
                ? 'bg-yellow-400 text-black focus:ring-yellow-300 p-3'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200 focus:ring-blue-300 p-3';
            break;
        case 'primary':
        default:
            variantClasses = isHighContrast
                ? 'bg-yellow-400 text-black focus:ring-yellow-300 py-4 px-10'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 py-4 px-10';
            break;
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses} ${fontSize} ${className}`}
        >
            {children}
        </button>
    );
};
