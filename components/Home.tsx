
import React from 'react';
import { Screen } from '../types';
import { Card } from './common/Card';
import { BookOpenIcon, ChartPieIcon, WrenchScrewdriverIcon, Cog6ToothIcon } from './common/Icons';
import { useAccessibility } from '../context/AccessibilityContext';

interface HomeProps {
  setScreen: (screen: Screen) => void;
}

const menuItems = [
  { screen: 'diagnostic' as Screen, title: 'Empezar Diagnóstico', description: 'Descubre por dónde empezar', icon: <ChartPieIcon /> },
  { screen: 'tutorials' as Screen, title: 'Ver Tutoriales', description: 'Aprende paso a paso', icon: <BookOpenIcon /> },
  { screen: 'maintenance' as Screen, title: 'Consejos Útiles', description: 'Cuida tu equipo', icon: <WrenchScrewdriverIcon /> },
  { screen: 'settings' as Screen, title: 'Configuración', description: 'Personaliza tu experiencia', icon: <Cog6ToothIcon /> },
];

export const Home: React.FC<HomeProps> = ({ setScreen }) => {
  const { fontSize, isHighContrast } = useAccessibility();
  const titleColor = isHighContrast ? 'text-yellow-400' : 'text-gray-900';
  const descColor = isHighContrast ? 'text-yellow-200' : 'text-gray-600';
  const iconColor = isHighContrast ? 'text-yellow-400' : 'text-blue-600';

  return (
    <div className="animate-fade-in p-4 md:p-8">
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${titleColor}`}>Bienvenido a TecnoAprende</h2>
      <p className={`text-center mb-10 ${fontSize} ${descColor}`}>
        Tu aventura en el mundo digital comienza aquí. Elige una opción para empezar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {menuItems.map((item) => (
          <Card key={item.screen} onClick={() => setScreen(item.screen)}>
            <div className="flex flex-col items-center text-center">
              <div className={`mb-4 ${iconColor}`}>{item.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>{item.title}</h3>
              <p className={`${fontSize} ${descColor}`}>{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
