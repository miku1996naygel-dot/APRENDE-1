
import React from 'react';
import { Screen, Tutorial } from '../types';
import { TUTORIALS_DATA } from '../constants';
import { Card } from './common/Card';
import { useAccessibility } from '../context/AccessibilityContext';
import { Button } from './common/Button';
import { ArrowLeftIcon } from './common/Icons';

interface TutorialsListProps {
  setScreen: (screen: Screen) => void;
  setSelectedTutorial: (tutorial: Tutorial) => void;
  recommendedTutorials: string[];
  isRecommendation?: boolean;
}

export const TutorialsList: React.FC<TutorialsListProps> = ({ setScreen, setSelectedTutorial, recommendedTutorials, isRecommendation = false }) => {
  const { fontSize, isHighContrast } = useAccessibility();
  const tutorialsToShow = isRecommendation 
    ? TUTORIALS_DATA.filter(t => recommendedTutorials.includes(t.title))
    : TUTORIALS_DATA;
    
  const handleSelectTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    setScreen('tutorial_detail');
  };
  
  const titleColor = isHighContrast ? 'text-yellow-400' : 'text-gray-900';
  const iconColor = isHighContrast ? 'text-yellow-400' : 'text-blue-600';

  const backScreen = isRecommendation ? 'diagnostic' : 'home';

  return (
    <div className="animate-fade-in p-4 md:p-8">
      <Button onClick={() => setScreen(backScreen)} variant="secondary" className="mb-6 !py-2 !px-4 !rounded-lg flex items-center gap-2">
            <ArrowLeftIcon /> Volver
      </Button>

      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${titleColor}`}>
        {isRecommendation ? "Tu Ruta de Aprendizaje" : "Todos los Tutoriales"}
      </h2>
      
      {isRecommendation && tutorialsToShow.length === 0 && (
         <Card className="text-center">
            <p className={`${fontSize} ${titleColor}`}>No pudimos generar recomendaciones en este momento. ¡Pero puedes explorar todos nuestros tutoriales!</p>
             <Button onClick={() => setScreen('tutorials')} className="mt-4">
                 Ver todos los tutoriales
             </Button>
         </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorialsToShow.map(tutorial => (
          <Card key={tutorial.id} onClick={() => handleSelectTutorial(tutorial)}>
            <div className="flex flex-col items-center text-center p-4">
                <div className={`mb-4 ${iconColor}`}>
                    {React.cloneElement(tutorial.icon as React.ReactElement, { className: "w-12 h-12" })}
                </div>
              <h3 className={`text-xl font-bold ${titleColor}`}>{tutorial.title}</h3>
            </div>
          </Card>
        ))}
      </div>
       {!isRecommendation && (
          <div className="text-center mt-12">
               <Button onClick={() => setScreen('home')}>Volver al Inicio</Button>
          </div>
        )}
    </div>
  );
};
