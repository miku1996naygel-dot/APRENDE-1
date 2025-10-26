
import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export const Header: React.FC = () => {
  const { isHighContrast } = useAccessibility();

  const themeClasses = isHighContrast
    ? 'bg-black text-yellow-400 border-b-4 border-yellow-400'
    : 'bg-white text-gray-800 shadow-md';

  return (
    <header className={`py-4 px-6 md:px-12 sticky top-0 z-10 ${themeClasses}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Tecno<span className={isHighContrast ? 'text-white' : 'text-blue-600'}>Aprende</span>
        </h1>
        <p className="text-sm md:text-base text-right">
            Proyecto de IE G.L. Simón Bolívar<br/>
            <span className="font-semibold">Caylloma</span>
        </p>
      </div>
    </header>
  );
};
