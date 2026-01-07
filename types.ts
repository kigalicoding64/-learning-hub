
export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  content: string;
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; 
  lessons: Lesson[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  category: string;
  partner?: string;
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
