
import { Course } from './types';

const WEB_ARCH_COURSE: Course = {
  id: 'web-arch-v1',
  title: 'Enterprise Web Architecture & System Design',
  description: 'Master the high-level design of scalable web systems. Learn to manage millions of concurrent users with industrial-grade patterns.',
  price: 49.99,
  level: 'Advanced',
  rating: 4.9,
  students: 15400,
  category: 'Computer Science',
  partner: 'Egreed Engineering',
  skillsAcquired: ['System Design', 'Microservices', 'Load Balancing', 'Database Sharding', 'CDN Orchestration', 'HA Architecture'],
  lessons: [
    {
      id: 'WA-L1',
      title: 'Phase 1: Foundations of Global Scalability',
      duration: 25,
      content: `# Foundations of Global Scalability\n\nScaling is not just about adding more servers; it's about managing state, concurrency, and latency.\n\n## Learning Objectives\n- Differentiate between Vertical and Horizontal scaling.\n- Understand the CAP Theorem in distributed systems.\n- Master the concept of "Stateless" application design.`,
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 'WA-L2',
      title: 'Phase 2: Load Balancing & Reverse Proxies',
      duration: 30,
      content: `# Load Balancing Strategies\n\nA Load Balancer is the traffic cop of your architecture. Learn to distribute requests across clusters.\n\n## Key Algorithms\n- Round Robin\n- Weighted Least Connections\n- IP Hashing for Session Affinity`,
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'WA-L3',
      title: 'Phase 3: High-Performance Caching Layer',
      duration: 20,
      content: `# Distributed Caching\n\nImplement Redis and Memcached to reduce database load and improve response times.\n\n## Implementation\n- Write-Through vs Cache-Aside strategies.\n- Cache Invalidation protocols.\n- Edge caching with Global CDNs.`
    },
    {
      id: 'WA-L4',
      title: 'Phase 4: Database Sharding & Partitioning',
      duration: 35,
      content: `# Database Scaling\n\nWhen a single DB becomes the bottleneck, we partition. Learn horizontal scaling for RDBMS and NoSQL systems.`
    },
    {
      id: 'WA-L5',
      title: 'Phase 5: Microservices Orchestration',
      duration: 40,
      content: `# Microservices vs Monoliths\n\nBreaking down the application into manageable, independent services. Master gRPC and message brokers like RabbitMQ.`
    },
    {
      id: 'WA-L6',
      title: 'Phase 6: Final System Design Interview Prep',
      duration: 50,
      content: `# Capstone: Building a Global Video Streamer\n\nApply all concepts to design a system capable of handling 100M+ active users. Focus on cost-efficiency and 99.999% availability.`
    }
  ]
};

const AI_ENGINEERING_COURSE: Course = {
  id: 'ai-eng-v1',
  title: 'Fullstack AI Engineering: LLMs & RAG',
  description: 'Integrate advanced intelligence into your applications. Learn Prompt Engineering, Vector Databases, and Agentic workflows.',
  price: 59.99,
  level: 'Advanced',
  rating: 4.95,
  students: 8900,
  category: 'Computer Science',
  partner: 'Egreed AI Labs',
  skillsAcquired: ['LLM Orchestration', 'Vector DBs', 'Prompt Engineering', 'RAG Architectures', 'AI Agents', 'Semantic Search'],
  lessons: [
    {
      id: 'AI-L1',
      title: 'Phase 1: The Modern AI Stack',
      duration: 20,
      content: `# Introduction to Generative Engineering\n\nMoving from consumer use to production-grade integration.`,
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'AI-L2',
      title: 'Phase 2: Scientific Prompt Engineering',
      duration: 25,
      content: `# Prompting as a Code Discipline\n\nChain-of-Thought, Few-Shot, and System Instruction mastery.`
    },
    {
      id: 'AI-L3',
      title: 'Phase 3: Vector Embeddings & Databases',
      duration: 40,
      content: `# Semantic Search Mechanics\n\nImplementing Pinecone, Weaviate, or ChromaDB for high-dimensional data retrieval.`
    },
    {
      id: 'AI-L4',
      title: 'Phase 4: RAG Pipeline Construction',
      duration: 45,
      content: `# Retrieval Augmented Generation\n\nSolving hallucinations with grounded data pipelines.`
    },
    {
      id: 'AI-L5',
      title: 'Phase 5: Function Calling & Agentic Tools',
      duration: 35,
      content: `# Giving AI Hands\n\nAllowing models to interact with APIs and execute code safely.`
    },
    {
      id: 'AI-L6',
      title: 'Phase 6: Deployment & Monitoring (LLMOps)',
      duration: 30,
      content: `# Production AI\n\nScaling inference, managing token costs, and monitoring drift.`
    }
  ]
};

const UI_DESIGN_COURSE: Course = {
  id: 'ui-design-v1',
  title: 'Modern UI/UX Design with CSS Grid & Flexbox',
  description: 'Go beyond the basics. Build fluid, accessible, and stunning interfaces that work on every device.',
  price: 29.99,
  level: 'Beginner',
  rating: 4.85,
  students: 42000,
  category: 'Design',
  partner: 'Egreed Design Hub',
  skillsAcquired: ['Responsive Design', 'CSS Grid', 'Flexbox', 'Web Accessibility', 'Modern CSS Variables', 'Typography'],
  lessons: [
    { id: 'UI-L1', title: 'Phase 1: The Modern Box Model', duration: 15, content: `# CSS Foundations\n\nMastering sizing, spacing, and layout logic.`, videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    { id: 'UI-L2', title: 'Phase 2: Flexbox Mastery', duration: 25, content: `# Dynamic Layouts\n\nOne-dimensional alignment and distribution.` },
    { id: 'UI-L3', title: 'Phase 3: CSS Grid Revolution', duration: 30, content: `# Two-Dimensional Power\n\nComplex dashboard layouts with Grid Areas.` },
    { id: 'UI-L4', title: 'Phase 4: Accessibility (A11y)', duration: 20, content: `# Designing for All\n\nSemantic HTML, ARIA labels, and contrast standards.` },
    { id: 'UI-L5', title: 'Phase 5: Animation & Interactions', duration: 25, content: `# Living Interfaces\n\nMicro-interactions with Framer Motion and CSS.` },
    { id: 'UI-L6', title: 'Phase 6: The Design-to-Code Pipeline', duration: 30, content: `# Figma Mastery\n\nImplementing professional design systems in React.` }
  ]
};

export const COURSES: Course[] = [
    WEB_ARCH_COURSE,
    AI_ENGINEERING_COURSE,
    UI_DESIGN_COURSE,
];
