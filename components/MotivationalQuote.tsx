
import React, { useState, useEffect } from 'react';
import { generateMotivationalQuote } from '../services/geminiService';
import { useAccessibility } from '../context/AccessibilityContext';

export const MotivationalQuote: React.FC = () => {
    const [quote, setQuote] = useState<string>("¡Cada paso que das es un gran logro!");
    const { isHighContrast, fontSize } = useAccessibility();

    useEffect(() => {
        const fetchQuote = async () => {
            const newQuote = await generateMotivationalQuote();
            setQuote(newQuote);
        };
        fetchQuote();
    }, []);

    const themeClasses = isHighContrast
        ? 'text-yellow-300'
        : 'text-gray-500';

    return (
        <div className="text-center p-6 mt-8">
            <p className={`italic ${fontSize} ${themeClasses}`}>"{quote}"</p>
        </div>
    );
};
