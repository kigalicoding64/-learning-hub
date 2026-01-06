
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";
import { Quiz } from '../types';

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates a quiz based on the provided lesson content.
 */
export const generateQuiz = async (lessonContent: string, lessonTitle: string): Promise<Quiz> => {
  const ai = getAI();
  const prompt = `Based on the following lesson content, generate a multiple-choice quiz with 3 questions. 
For each question, provide 4 options and indicate the correct answer. The quiz should test understanding of the key concepts in the text.

Lesson Content:
---
${lessonContent}
---
`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        description: "An array of quiz questions.",
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: "The question text."
            },
            options: {
              type: Type.ARRAY,
              description: "An array of 4 possible answers (strings).",
              items: { type: Type.STRING }
            },
            correctAnswer: {
              type: Type.STRING,
              description: "The exact string of the correct answer from the options."
            }
          },
          required: ["question", "options", "correctAnswer"]
        }
      }
    },
    required: ["questions"]
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return {
      title: `Quiz: ${lessonTitle}`,
      questions: parsedJson.questions,
    };
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

/**
 * Summarizes content using Flash Lite for speed.
 */
export const summarizeContent = async (content: string): Promise<string> => {
  const ai = getAI();
  const prompt = `Summarize the following text in three clear and concise key bullet points: ${content}`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error summarizing:", error);
    throw error;
  }
};

/**
 * Generate speech from text using the TTS model.
 */
export const generateTTS = async (text: string): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Say naturally: ${text}` }] }],
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
        if (!base64Audio) throw new Error("No audio data returned");
        return base64Audio;
    } catch (error) {
        console.error("TTS failed:", error);
        throw error;
    }
};

/**
 * Transcribe audio from base64 string using Flash Pro.
 */
export const transcribeAudio = async (base64Audio: string): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
                parts: [
                    { inlineData: { mimeType: 'audio/pcm;rate=16000', data: base64Audio } },
                    { text: "Transcribe the following audio exactly as spoken." }
                ]
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Transcription failed:", error);
        throw error;
    }
};

/**
 * Analyze an image using Gemini 3 Pro.
 */
export const analyzeMedia = async (base64Media: string, mimeType: string, prompt: string): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Media } },
                    { text: prompt }
                ]
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Analysis failed:", error);
        throw error;
    }
};

/**
 * Image Generation using Gemini 3 Pro Image.
 */
export const generateAIImage = async (prompt: string, aspectRatio: string = "1:1"): Promise<string> => {
    const ai = getAI();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: {
                imageConfig: { aspectRatio, imageSize: "1K" }
            },
        });
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
        }
        throw new Error("No image generated");
    } catch (error) {
        console.error("Image gen failed:", error);
        throw error;
    }
};

/**
 * Video Generation using Veo.
 */
export const generateAIVideo = async (prompt: string, aspectRatio: '16:9' | '9:16', imageRef?: string): Promise<string> => {
    const ai = getAI();
    try {
        const payload: any = {
            model: 'veo-3.1-fast-generate-preview',
            prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio
            }
        };

        if (imageRef) {
            payload.image = {
                imageBytes: imageRef.split(',')[1],
                mimeType: 'image/png'
            };
        }

        let operation = await ai.models.generateVideos(payload);
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Video gen failed:", error);
        throw error;
    }
};

// Encoding/Decoding helpers for Live API
export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
