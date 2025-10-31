import { GoogleGenAI, GenerateContentResponse, Modality, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generatePersonalizedPath = async (answers: string[], tutorialTitles: string[]): Promise<string[]> => {
  try {
    const prompt = `Un usuario con baja alfabetización digital respondió a un cuestionario. Sus respuestas fueron: ${answers.join(', ')}. Basado en esto, recomienda 3 tutoriales de la siguiente lista para que empiece su aprendizaje. Lista de tutoriales disponibles: ${tutorialTitles.join(', ')}. Responde únicamente con un array JSON de strings con los títulos exactos de los tutoriales recomendados. Ejemplo de respuesta: ["Título del tutorial 1", "Título del tutorial 2"]`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
        }
    });

    const path = JSON.parse(response.text);
    return Array.isArray(path) ? path : [];
  } catch (error) {
    console.error("Error generating personalized path:", error);
    return [];
  }
};

export const generateMaintenanceTip = async (): Promise<string> => {
  try {
    const prompt = "Genera un consejo de mantenimiento preventivo para una computadora o celular. El consejo debe ser muy simple, corto (una o dos frases) y fácil de entender para alguien sin conocimientos técnicos. El tono debe ser amigable. Responde solo con el texto del consejo.";
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating maintenance tip:", error);
    return "No se pudo generar un consejo. Inténtalo de nuevo más tarde.";
  }
};

export const generateMotivationalQuote = async (): Promise<string> => {
    try {
        const prompt = "Genera una frase motivadora corta sobre aprender cosas nuevas y la tecnología. Debe ser simple y alentadora para alguien que está empezando. Responde solo con la frase.";
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating motivational quote:", error);
        return "¡Cada paso que das es un gran logro!";
    }
};

export const textToSpeech = async (text: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Lee esto de forma clara y pausada: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};