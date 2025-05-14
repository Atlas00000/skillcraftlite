import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import { animations, transitions } from '../../utils/animations';

// Mock data for a single course
const course = {
  id: 1,
  title: 'Web Development Fundamentals',
  description: 'Learn the basics of HTML, CSS, and JavaScript',
  category: 'Programming',
  level: 'Beginner',
  duration: '8 weeks',
  instructor: 'John Doe',
  rating: 4.8,
  students: 1234,
  price: 49.99,
  progress: 35,
  curriculum: [
    {
      week: 1,
      title: 'Introduction to Web Development',
      lessons: [
        { id: 1, title: 'Understanding the Web', duration: '30 min', completed: true },
        { id: 2, title: 'Setting up your development environment', duration: '45 min', completed: true },
        { id: 3, title: 'Basic HTML structure', duration: '60 min', completed: false },
      ],
    },
    {
      week: 2,
      title: 'HTML Fundamentals',
      lessons: [
        { id: 4, title: 'HTML elements and attributes', duration: '45 min', completed: false },
        { id: 5, title: 'Semantic HTML', duration: '60 min', completed: false },
        { id: 6, title: 'Forms and input types', duration: '75 min', completed: false },
      ],
    },
    {
      week: 3,
      title: 'CSS Basics',
      lessons: [
        { id: 7, title: 'CSS selectors and properties', duration: '60 min', completed: false },
        { id: 8, title: 'Box model and layout', duration: '90 min', completed: false },
        { id: 9, title: 'Responsive design principles', duration: '75 min', completed: false },
      ],
    },
  ],
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsEnrolling(false);
    // Handle enrollment logic
  };

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <div className="container mx-auto p-4">
      <div className={`mb-8 ${animations.fadeIn}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {course.category}
          </span>
          <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {course.level}
          </span>
          <div className="ml-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-1">⭐</span>
            {course.rating}
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-300">{course.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Instructor: {course.instructor}</span>
          <span>{course.students} students</span>
          <span>Duration: {course.duration}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className={`mb-8 ${animations.slideUp}`}>
            <div className="mb-6">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Your Progress</h2>
              <ProgressBar progress={course.progress} size="lg" label="Course Progress" />
            </div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((week, index) => (
                <div
                  key={week.week}
                  className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 ${transitions.default}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleWeek(week.week)}
                    className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Week {week.week}: {week.title}
                    </h3>
                    <svg
                      className={`h-5 w-5 transform text-gray-500 transition-transform ${
                        expandedWeek === week.week ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedWeek === week.week && (
                    <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                      <ul className="space-y-3">
                        {week.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center">
                              <div
                                className={`mr-3 h-5 w-5 rounded-full border-2 ${
                                  lesson.completed
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}
                              />
                              <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className={`sticky top-4 ${animations.slideIn}`}>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${course.price}</span>
            </div>
            <Button
              className="mb-4 w-full"
              onClick={handleEnroll}
              isLoading={isEnrolling}
              size="lg"
            >
              {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
            </Button>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Full lifetime access
              </p>
              <p className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Certificate of completion
              </p>
              <p className="flex items-center">
                <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day money-back guarantee
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 