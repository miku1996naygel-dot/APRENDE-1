
import { ReactNode, ReactElement } from 'react';

export interface Tutorial {
  id: string;
  category: string;
  title: string;
  content: string[];
  videoUrl?: string; 
  icon: ReactElement<{ className?: string }>;
}

export interface DiagnosticQuestion {
  id: number;
  text: string;
  options: { text: string; value: number }[];
}

export type Screen = 
  | 'home' 
  | 'diagnostic'
  | 'diagnostic_results'
  | 'tutorials' 
  | 'tutorial_detail'
  | 'maintenance' 
  | 'settings';

export interface AccessibilitySettings {
  isHighContrast: boolean;
  fontSize: 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl';
}

export interface AccessibilityContextType extends AccessibilitySettings {
  toggleHighContrast: () => void;
  setFontSize: (size: AccessibilitySettings['fontSize']) => void;
}