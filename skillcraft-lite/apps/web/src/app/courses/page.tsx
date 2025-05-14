import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { animations, transitions } from '../utils/animations';

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    rating: 4.8,
    students: 1234,
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and patterns',
    category: 'Programming',
    level: 'Advanced',
    duration: '6 weeks',
    rating: 4.9,
    students: 856,
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn essential design principles and tools',
    category: 'Design',
    level: 'Intermediate',
    duration: '4 weeks',
    rating: 4.7,
    students: 1023,
  },
];

const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing'];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = async (courseId: number) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle enrollment logic
  };

  return (
    <div className="container mx-auto p-4">
      <div className={`mb-8 ${animations.fadeIn}`}>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Explore Courses</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${transitions.default}`}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${animations.slideIn}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <Card
            key={course.id}
            hover="lift"
            className={`${animations.slideUp}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                {course.category}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-1">⭐</span>
                {course.rating}
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{course.title}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{course.description}</p>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="block text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {course.students} students
                </span>
              </div>
              <Button
                onClick={() => handleEnroll(course.id)}
                isLoading={isLoading}
                size="sm"
              >
                Enroll Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 