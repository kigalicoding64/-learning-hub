
export interface User {
  id: string;
  email: string;
  fullName: string;
  joinedAt: string;
  country?: string;
  language?: string;
  educationLevel?: string;
  goals?: string[];
  experienceLevel?: string;
  role: 'learner' | 'admin' | 'instructor';
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; 
  content: string;
  videoUrl?: string;
  type: 'video' | 'text' | 'task';
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: Quiz;
  practiceTask?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; 
  modules: Module[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  category: string;
  skillsAcquired: string[];
  tags?: ('popular' | 'trending' | 'needed')[];
}

export interface Enrollment {
  courseId: string;
  progress: number; // 0-100
  completedLessons: string[]; // lessonIds
  completedQuizzes: string[]; // moduleIds
  examScore?: number;
  enrolledAt: string;
  certificateHash?: string;
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

export type ViewState = 'landing' | 'onboarding' | 'catalog' | 'dashboard' | 'course' | 'verify' | 'settings' | 'admin' | 'static';
