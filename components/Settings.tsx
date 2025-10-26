
import React from 'react';
import { Screen, AccessibilitySettings } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { ArrowLeftIcon } from './common/Icons';

interface SettingsProps {
  setScreen: (screen: Screen) => void;
}

export const Settings: React.FC<SettingsProps> = ({ setScreen }) => {
  const { isHighContrast, toggleHighContrast, fontSize, setFontSize } = useAccessibility();
  
  const titleColor = isHighContrast ? 'text-yellow-400' : 'text-gray-900';
  const labelColor = isHighContrast ? 'text-yellow-200' : 'text-gray-600';
  const toggleBg = isHighContrast ? (isHighContrast ? 'bg-yellow-400' : 'bg-gray-600') : (isHighContrast ? 'bg-blue-600' : 'bg-gray-200');
  const toggleIndicatorBg = isHighContrast ? 'bg-black' : 'bg-white';
  
  const fontSizes: { label: string, value: AccessibilitySettings['fontSize'] }[] = [
    { label: 'Normal', value: 'text-lg' },
    { label: 'Grande', value: 'text-xl' },
    { label: 'Más Grande', value: 'text-2xl' },
  ];

  return (
    <div className="animate-fade-in p-4 md:p-8 max-w-2xl mx-auto">
        <Button onClick={() => setScreen('home')} variant="secondary" className="mb-6 !py-2 !px-4 !rounded-lg flex items-center gap-2">
            <ArrowLeftIcon /> Volver
        </Button>
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${titleColor}`}>Configuración de Accesibilidad</h2>
      
      <Card>
        <div className="space-y-8 p-4">
          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast-toggle" className={`${fontSize} ${labelColor} font-semibold`}>
              Modo de Alto Contraste
            </label>
            <button
              id="high-contrast-toggle"
              onClick={toggleHighContrast}
              className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isHighContrast ? 'focus:ring-offset-black' : 'focus:ring-offset-white'} focus:ring-blue-500`}
              style={{ backgroundColor: toggleBg }}
            >
              <span
                className={`inline-block w-6 h-6 transform rounded-full transition-transform duration-300 ${isHighContrast ? 'translate-x-9' : 'translate-x-1'}`}
                style={{ backgroundColor: toggleIndicatorBg }}
              />
            </button>
          </div>

          {/* Font Size Selector */}
          <div>
             <h3 className={`${fontSize} ${labelColor} font-semibold mb-4`}>Tamaño del Texto</h3>
             <div className="flex justify-between space-x-2">
                {fontSizes.map(size => (
                    <Button 
                        key={size.value} 
                        onClick={() => setFontSize(size.value)}
                        variant="secondary"
                        className={`!rounded-lg flex-1 !py-3 ${fontSize === size.value ? (isHighContrast ? '!bg-yellow-400 !text-black' : '!bg-blue-600 !text-white') : ''}`}
                    >
                        {size.label}
                    </Button>
                ))}
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
