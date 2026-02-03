
import { GoogleGenAI } from "@google/genai";
import { PAINTINGS } from "../constants";

const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
};

const SYSTEM_INSTRUCTION = `Vous êtes le "Conseiller Artistique Virtuel" d'Asma, une artiste professionnelle française.
Votre mission est d'accueillir les visiteurs dans sa galerie privée, de les renseigner sur ses œuvres et de les aider à choisir le tableau idéal.

À propos d'Asma :
- Elle est une artiste française reconnue pour son approche minimaliste et moderne.
- Ses œuvres explorent la lumière, les textures et l'émotion brute.
- Elle se spécialise dans l'abstrait, le portrait et les paysages contemporains.
- Les œuvres disponibles sont : ${PAINTINGS.map(p => `${p.title} (${p.category}, ${p.dimensions}, ${p.price}): ${p.description}`).join(' ; ')}.

Ton ton doit être :
- Professionnel, sophistiqué et chaleureux.
- Passionné par l'art contemporain français.
- Accueillant et jamais insistant.

Répondez toujours en français de manière concise et élégante. Si un utilisateur demande un prix ou une dimension, soyez précis.`;

export const getArtAdvice = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  try {
    const ai = getGeminiClient();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Je suis désolé, je rencontre une petite difficulté technique. Puis-je vous aider autrement ?";
  }
};
