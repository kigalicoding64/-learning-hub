
export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // Price in USD. 0 for free.
  lessons: Lesson[];
}

export enum MessageSender {
    USER = 'user',
    AI = 'ai'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  isStreaming?: boolean;
  groundingUrls?: Array<{title: string, uri: string}>;
  isThinking?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export type AILabTool = 'image-gen' | 'image-analyze' | 'video-gen' | 'video-analyze' | 'transcription' | 'tts';
