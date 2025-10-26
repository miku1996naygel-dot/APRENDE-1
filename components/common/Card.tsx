
import React, { ReactNode } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
    const { isHighContrast } = useAccessibility();
    const baseClasses = `rounded-2xl shadow-lg p-6 transition-all duration-300`;
    const themeClasses = isHighContrast 
        ? 'bg-black border-4 border-yellow-400 text-yellow-400'
        : 'bg-white border border-gray-200 text-gray-800';
    const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : '';

    return (
        <div 
            className={`${baseClasses} ${themeClasses} ${interactiveClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
