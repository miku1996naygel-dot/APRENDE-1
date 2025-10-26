
import React, { useState } from 'react';
import { Screen, Tutorial } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { Button } from './common/Button';
import { textToSpeech } from '../services/geminiService';
import { ArrowLeftIcon, SpeakerWaveIcon } from './common/Icons';

interface TutorialDetailProps {
  tutorial: Tutorial;
  setScreen: (screen: Screen) => void;
  isFromRecommendation: boolean;
}

// Helper functions for audio playback
function decode(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000); // 1 channel, 24000 sample rate
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}


export const TutorialDetail: React.FC<TutorialDetailProps> = ({ tutorial, setScreen, isFromRecommendation }) => {
  const { fontSize, isHighContrast } = useAccessibility();
  const [isReading, setIsReading] = useState(false);
  
  const audioContext = new (window.AudioContext)({sampleRate: 24000});

  const handleReadAloud = async () => {
    setIsReading(true);
    const fullText = tutorial.content.join('. ');
    const base64Audio = await textToSpeech(fullText);

    if (base64Audio && audioContext) {
      try {
        const audioBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioBytes, audioContext);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
        source.onended = () => {
            setIsReading(false);
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsReading(false);
      }
    } else {
        setIsReading(false);
    }
  };
  
  const titleColor = isHighContrast ? 'text-yellow-400' : 'text-gray-900';
  const textColor = isHighContrast ? 'text-yellow-200' : 'text-gray-700';
  const backScreen = isFromRecommendation ? 'diagnostic_results' : 'tutorials';

  return (
    <div className="animate-fade-in p-4 md:p-8 max-w-4xl mx-auto">
      <Button onClick={() => setScreen(backScreen)} variant="secondary" className="mb-6 !py-2 !px-4 !rounded-lg flex items-center gap-2">
            <ArrowLeftIcon /> Volver a la lista
      </Button>
      
      <article>
        <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${titleColor}`}>{tutorial.title}</h2>
        
        <div className="mb-8">
            <Button onClick={handleReadAloud} disabled={isReading} variant="secondary" className="!rounded-lg !py-3 !px-5 flex items-center gap-3">
                <SpeakerWaveIcon />
                {isReading ? 'Leyendo...' : 'Leer en voz alta'}
            </Button>
        </div>

        <div className={`space-y-6 ${fontSize} ${textColor}`}>
          {tutorial.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {tutorial.videoUrl && (
          <div className="mt-10">
            <h3 className={`text-2xl font-bold mb-4 ${titleColor}`}>Video de Ayuda</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
              {/* Placeholder for video */}
              <p className="text-gray-500">Próximamente: video tutorial</p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
