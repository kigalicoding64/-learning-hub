
import { Course, Module, Lesson, Quiz } from './types';

const generateMockQuiz = (title: string): Quiz => ({
  title: `Validation Quiz: ${title}`,
  questions: [
    { question: `What is the primary architectural principle of ${title}?`, options: ["Abstraction", "Encapsulation", "Redundancy", "Inheritance"], correctAnswer: "Abstraction" },
    { question: `Which protocol is best suited for ${title} deployment?`, options: ["REST", "gRPC", "GraphQL", "WebSockets"], correctAnswer: "REST" },
    { question: `How do you measure efficiency in ${title}?`, options: ["Throughput", "Latency", "Cost", "All of the above"], correctAnswer: "All of the above" }
  ]
});

const generateDeepSyllabus = (courseId: string, title: string, category: string): Module[] => {
  const moduleCount = 8;
  const modules: Module[] = [];

  for (let m = 1; m <= moduleCount; m++) {
    const moduleId = `${courseId}-M${m}`;
    const lessons: Lesson[] = [
      { 
        id: `${moduleId}-L1`, 
        title: `Introduction to Phase ${m}`, 
        duration: 15, 
        type: 'video', 
        content: `# Phase ${m}: Core Logic\nMastering the fundamental patterns of ${title}.` 
      },
      { 
        id: `${moduleId}-L2`, 
        title: `Deep Implementation`, 
        duration: 30, 
        type: 'text', 
        content: `## Technical Deep Dive\nExplaining the variables and constants required for industrial-grade ${title}.` 
      }
    ];

    modules.push({
      id: moduleId,
      title: `Module ${m}: Advanced ${title} Patterns`,
      lessons,
      practiceTask: `Apply the principles from Phase ${m} to a real-world scenario. Submit a 500-word architectural review.`,
      quiz: generateMockQuiz(title)
    });
  }

  return modules;
};

const generateCatalog = (): Course[] => {
  const catalog: Course[] = [];
  let globalIdCounter = 1;

  const sectors = [
    { cat: 'TECHNOLOGY & IT', target: 180, titles: ['Python Master', 'React Architect', 'DevOps Lead', 'Cloud Engineer', 'Cyber Security Specialist'] },
    { cat: 'BUSINESS', target: 150, titles: ['Startup Founder', 'Project Manager', 'HR Lead', 'Operations Chief'] },
    { cat: 'MARKETING', target: 120, titles: ['SEO Guru', 'Digital Strategist', 'Social Media Lead'] },
    { cat: 'DESIGN', target: 100, titles: ['UI Designer', 'UX Researcher', 'Motion Artist'] },
    { cat: 'EDUCATION', target: 100, titles: ['Instructional Designer', 'STEM Teacher'] },
    { cat: 'LANGUAGES', target: 160, titles: ['English Fluency', 'French for Business', 'Swahili Expert'] },
    { cat: 'FINANCE', target: 70, titles: ['Crypto Analyst', 'Stock Trader', 'Financial Planner'] },
    { cat: 'ENGINEERING', target: 60, titles: ['Electrical Tech', 'Solar Installer', 'Civil Engineer'] },
    { cat: 'PERSONAL', target: 80, titles: ['Mindfulness Lead', 'Personal Growth Specialist'] }
  ];

  sectors.forEach(sector => {
    for (let i = 0; i < sector.target; i++) {
      const base = sector.titles[i % sector.titles.length];
      const title = i < sector.titles.length ? base : `${base} Level ${Math.floor(i / sector.titles.length) + 1}`;
      const id = `eg-${globalIdCounter++}`;
      
      catalog.push({
        id,
        title,
        category: sector.cat,
        description: `Professional institutional training in ${title}. Master industrial standards with Egreed Technology.`,
        price: i % 10 === 0 ? 0 : 29.99 + (i % 70),
        level: i % 3 === 0 ? 'Advanced' : 'Beginner',
        rating: 4.5 + (Math.random() * 0.5),
        students: 5000 + (i * 100),
        skillsAcquired: [base, 'Critical Reasoning', 'Industry Standards'],
        tags: i % 5 === 0 ? ['popular'] : i % 8 === 0 ? ['trending'] : ['needed'],
        modules: generateDeepSyllabus(id, title, sector.cat)
      });
    }
  });

  return catalog;
};

export const COURSES: Course[] = generateCatalog();
