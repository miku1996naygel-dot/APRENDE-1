
import React, { useState } from 'react';
import { Screen, Tutorial } from './types';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Diagnostic } from './components/Diagnostic';
import { TutorialsList } from './components/TutorialsList';
import { TutorialDetail } from './components/TutorialDetail';
import { MaintenanceTips } from './components/MaintenanceTips';
import { Settings } from './components/Settings';
import { MotivationalQuote } from './components/MotivationalQuote';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';

const AppContent: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [recommendedTutorials, setRecommendedTutorials] = useState<string[]>([]);
  const [isFromRecommendation, setIsFromRecommendation] = useState(false);
  const { isHighContrast } = useAccessibility();

  const themeClasses = isHighContrast
    ? 'bg-black text-white'
    : 'bg-gray-50 text-gray-800';

  const renderScreen = () => {
    switch (screen) {
      case 'diagnostic':
        return <Diagnostic setScreen={(s) => { setIsFromRecommendation(true); setScreen(s); }} setRecommendedTutorials={setRecommendedTutorials} />;
      case 'diagnostic_results':
        return <TutorialsList setScreen={setScreen} setSelectedTutorial={setSelectedTutorial} recommendedTutorials={recommendedTutorials} isRecommendation />;
      case 'tutorials':
        return <TutorialsList setScreen={(s) => { setIsFromRecommendation(false); setScreen(s); }} setSelectedTutorial={setSelectedTutorial} recommendedTutorials={[]} />;
      case 'tutorial_detail':
        return selectedTutorial && <TutorialDetail tutorial={selectedTutorial} setScreen={setScreen} isFromRecommendation={isFromRecommendation} />;
      case 'maintenance':
        return <MaintenanceTips setScreen={setScreen} />;
      case 'settings':
        return <Settings setScreen={setScreen} />;
      case 'home':
      default:
        return <Home setScreen={setScreen} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans ${themeClasses} transition-colors duration-300`}>
      <Header />
      <main className="container mx-auto py-8">
        {renderScreen()}
      </main>
      {screen === 'home' && <MotivationalQuote />}
    </div>
  );
};

const App: React.FC = () => (
  <AccessibilityProvider>
    <AppContent />
  </AccessibilityProvider>
);


export default App;
