'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  level: string;
  duration: string;
  instructor: {
    name: string;
    avatar: string;
  };
}

export default function ExplorePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch courses');
      }

      setCourses(data.courses);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = ['all', 'programming', 'design', 'business', 'marketing'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-alt p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Explore Courses</h1>
          <p className="text-text-secondary text-lg">
            Discover new skills and advance your career with our expert-led courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface-alt p-6 rounded-2xl shadow-xl border border-border-alt mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="search" className="text-sm font-medium text-text-secondary mb-2 block">
                Search Courses
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or description"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-medium text-text-secondary mb-2 block">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="text-sm font-medium text-text-secondary mb-2 block">
                Level
              </label>
              <select
                id="level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-8">
            {error}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-text-secondary py-8">
            No courses found matching your criteria
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-surface-alt rounded-2xl shadow-xl border border-border-alt overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-accent-purple/20 text-accent-purple rounded-full">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-accent-blue/20 text-accent-blue rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {course.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="ml-2 text-sm text-text-primary">
                        {course.instructor.name}
                      </span>
                    </div>
                    <span className="text-sm text-text-muted">
                      {course.duration}
                    </span>
                  </div>
                  <Link
                    href={`/course/${course.id}`}
                    className="mt-4 block w-full text-center py-2 px-4 bg-accent-purple hover:bg-accent-purple-hover text-white rounded-lg transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 