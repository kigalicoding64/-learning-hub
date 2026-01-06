
import React, { useState } from 'react';
import { Course } from '../types';
import Syllabus from './Syllabus';
import LessonContent from './LessonContent';

interface CourseViewProps {
  course: Course;
}

const CourseView: React.FC<CourseViewProps> = ({ course }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLesson = course.lessons[currentLessonIndex];

  return (
    <div className="animate-slide-in-up flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 lg:max-w-xs shrink-0">
          <Syllabus
            lessons={course.lessons}
            currentLessonIndex={currentLessonIndex}
            onSelectLesson={setCurrentLessonIndex}
          />
        </aside>
        
        <div className="flex-grow min-w-0">
          <LessonContent 
            key={currentLesson.id} 
            lesson={currentLesson} 
            courseTitle={course.title} 
          />
        </div>
    </div>
  );
};

export default CourseView;
