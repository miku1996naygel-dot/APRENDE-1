
import React, { useState, useEffect, useCallback } from 'react';
import { Screen } from '../types';
import { generateMaintenanceTip } from '../services/geminiService';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { useAccessibility } from '../context/AccessibilityContext';
import { ArrowLeftIcon } from './common/Icons';

interface MaintenanceTipsProps {
  setScreen: (screen: Screen) => void;
}

export const MaintenanceTips: React.FC<MaintenanceTipsProps> = ({ setScreen }) => {
  const [tip, setTip] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { fontSize, isHighContrast } = useAccessibility();

  const fetchTip = useCallback(async () => {
    setIsLoading(true);
    const newTip = await generateMaintenanceTip();
    setTip(newTip);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const titleColor = isHighContrast ? 'text-yellow-400' : 'text-gray-900';
  const textColor = isHighContrast ? 'text-yellow-200' : 'text-gray-700';

  return (
    <div className="animate-fade-in p-4 md:p-8 max-w-2xl mx-auto">
        <Button onClick={() => setScreen('home')} variant="secondary" className="mb-6 !py-2 !px-4 !rounded-lg flex items-center gap-2">
            <ArrowLeftIcon /> Volver
        </Button>
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${titleColor}`}>Consejos de Mantenimiento</h2>
      
      <Card className="min-h-[200px] flex items-center justify-center text-center">
        {isLoading ? (
          <div className={`w-12 h-12 border-4 ${isHighContrast ? 'border-yellow-400' : 'border-blue-600'} border-dashed rounded-full animate-spin`}></div>
        ) : (
          <p className={`${fontSize} ${textColor}`}>{tip}</p>
        )}
      </Card>

      <div className="mt-8 text-center">
        <Button onClick={fetchTip} disabled={isLoading}>
          {isLoading ? 'Generando...' : 'Obtener otro consejo'}
        </Button>
      </div>
    </div>
  );
};
