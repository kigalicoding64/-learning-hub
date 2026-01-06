
import { Course, Lesson } from './types';

const WEB_MANAGEMENT_COURSE: Course = {
  id: 'web-arch-v1',
  title: 'Web Management & Architecture Specialization',
  description: 'Master the essential concepts of building and managing robust, scalable modern websites, from frontend to backend.',
  price: 49.99,
  level: 'Intermediate',
  rating: 4.8,
  students: 12540,
  category: 'Computer Science',
  partner: 'Egreed Engineering',
  lessons: [
    {
      id: 'L1',
      title: 'Intro to Web Architecture',
      duration: 20,
      content: `Welcome to 'Web Management & Architecture' by Egreed Technology! This course will guide you through the essential concepts...`
    }
  ]
};

const HTML_CSS_COURSE: Course = {
    id: 'html-css-v1',
    title: 'Modern Web Design with HTML & CSS',
    description: 'A perfect starting point! Learn the two foundational languages of the web to build and style your very first web pages.',
    price: 0,
    level: 'Beginner',
    rating: 4.9,
    students: 45200,
    category: 'Design',
    partner: 'Google Cloud Partner',
    lessons: [
        {
            id: 'HC1',
            title: 'Your First HTML Page',
            duration: 15,
            content: `Welcome to the world of web development! HTML stands for HyperText Markup Language...`
        }
    ]
};

const generatePlaceholderCourses = (): Course[] => {
    const courses: Course[] = [];
    const subjects = ['Python', 'JavaScript', 'Data Science', 'Machine Learning', 'Cybersecurity', 'DevOps', 'Go', 'Rust', 'UI/UX Design', 'Project Management'];
    const levels: any[] = ['Beginner', 'Intermediate', 'Advanced'];
    const categories = ['Data Science', 'Business', 'Computer Science', 'Personal Development'];

    for (let i = 0; i < 100; i++) {
        const subject = subjects[i % subjects.length];
        const category = categories[i % categories.length];
        const level = levels[i % levels.length];
        const title = `${level} ${subject} for Professionals`;
        
        courses.push({
            id: `placeholder-course-${i}`,
            title,
            description: `Unlock your potential with this in-depth guide to ${subject} in a professional ${category} context.`,
            price: (i % 5 === 0) ? 0 : parseFloat((29.99 + (i % 10) * 5).toFixed(2)),
            level,
            rating: 4.0 + (i % 10) / 10,
            students: 500 + (i * 12),
            category,
            lessons: [{ id: '1', title: 'Course Introduction', duration: 10, content: 'Placeholder content' }]
        });
    }
    return courses;
};

export const COURSES: Course[] = [
    WEB_MANAGEMENT_COURSE,
    HTML_CSS_COURSE,
    ...generatePlaceholderCourses()
];
