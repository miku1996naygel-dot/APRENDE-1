
import React, { useState } from 'react';
import { Screen, DiagnosticQuestion } from '../types';
import { DIAGNOSTIC_QUESTIONS, TUTORIALS_DATA } from '../constants';
import { generatePersonalizedPath } from '../services/geminiService';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { useAccessibility } from '../context/AccessibilityContext';
import { ArrowLeftIcon } from './common/Icons';

interface DiagnosticProps {
  setScreen: (screen: Screen) => void;
  setRecommendedTutorials: (titles: string[]) => void;
}

export const Diagnostic: React.FC<DiagnosticProps> = ({ setScreen, setRecommendedTutorials }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fontSize, isHighContrast } = useAccessibility();

  const handleAnswer = (optionText: string) => {
    const newAnswers = [...answers, `${DIAGNOSTIC_QUESTIONS[currentQuestionIndex].text}: ${optionText}`];
    setAnswers(newAnswers);

    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers: string[]) => {
    setIsLoading(true);
    const tutorialTitles = TUTORIALS_DATA.map(t => t.title);
    const recommended = await generatePersonalizedPath(finalAnswers, tutorialTitles);
    setRecommendedTutorials(recommended);
    setIsLoading(false);
    setScreen('diagnostic_results');
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
            <div className={`w-16 h-16 border-8 ${isHighContrast ? 'border-yellow-400' : 'border-blue-600'} border-dashed rounded-full animate-spin`}></div>
            <h2 className={`text-2xl font-bold mt-6 ${isHighContrast ? 'text-yellow-400' : 'text-gray-800'}`}>Analizando tus respuestas...</h2>
            <p className={`${fontSize} ${isHighContrast ? 'text-yellow-200' : 'text-gray-600'}`}>Estamos creando un plan de aprendizaje solo para ti.</p>
        </div>
    );
  }

  const question = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
  const titleColor = isHighContrast ? 'text-yellow-400' : 'text-gray-900';
  const progressBg = isHighContrast ? 'bg-yellow-400' : 'bg-blue-600';
  const progressTrackBg = isHighContrast ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div className="animate-fade-in p-4 md:p-8 max-w-2xl mx-auto">
        <Button onClick={() => setScreen('home')} variant="secondary" className="mb-6 !py-2 !px-4 !rounded-lg flex items-center gap-2">
            <ArrowLeftIcon /> Volver
        </Button>
      <Card>
        <div className="p-4">
          <div className="w-full h-4 rounded-full mb-6" style={{ backgroundColor: progressTrackBg }}>
            <div className="h-4 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%`, backgroundColor: progressBg }}></div>
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${titleColor}`}>{question.text}</h2>
          <div className="flex flex-col space-y-4">
            {question.options.map((option) => (
              <Button key={option.value} onClick={() => handleAnswer(option.text)}>
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
