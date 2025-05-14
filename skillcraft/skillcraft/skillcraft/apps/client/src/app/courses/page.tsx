'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const categoryOptions = [
  { label: 'All', value: '' },
  { label: 'Tech & Coding', value: 'programming' },
  { label: 'Business', value: 'business' },
  { label: 'Creative Arts', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
];

const popularCategories = [
  { label: 'Python', value: 'python' },
  { label: 'React', value: 'react' },
  { label: 'UI/UX', value: 'uiux' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Leadership', value: 'leadership' },
];

const CoursesListPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load courses');
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? course.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // Featured widget: show top 3 courses in a carousel
  const featuredCourses = courses.slice(0, 3);

  // Stats widget
  const totalCourses = courses.length;
  const totalInstructors = new Set(courses.map(c => c.instructor.name)).size;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-hidden px-4 pb-16">
      <div className="max-w-7xl mx-auto pt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Browse Courses</h1>
        {/* Stats Bar */}
        <section className="flex flex-wrap gap-6 mb-8">
          <div className="bg-[#23234a] rounded-2xl px-6 py-4 flex flex-col items-center shadow border border-[#23234a] min-w-[140px]">
            <span className="text-2xl font-bold text-blue-400">{totalCourses}</span>
            <span className="text-gray-400 text-xs mt-1">Courses</span>
          </div>
          <div className="bg-[#23234a] rounded-2xl px-6 py-4 flex flex-col items-center shadow border border-[#23234a] min-w-[140px]">
            <span className="text-2xl font-bold text-purple-400">{totalInstructors}</span>
            <span className="text-gray-400 text-xs mt-1">Instructors</span>
          </div>
        </section>
        {/* Featured Courses Carousel */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Featured</h2>
          <div className="relative w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {featuredCourses.length > 0 && (
                <motion.div
                  key={featuredIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#23234a] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg border border-[#23234a] min-h-[220px]"
                >
                  <img src={featuredCourses[featuredIdx].imageUrl} alt={featuredCourses[featuredIdx].title} width={120} height={120} className="rounded-xl object-cover mb-4 md:mb-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-white">{featuredCourses[featuredIdx].title}</h3>
                    <div className="text-gray-400 text-sm mb-2">By {featuredCourses[featuredIdx].instructor.name}</div>
                    <div className="text-gray-300 text-xs mb-4">{featuredCourses[featuredIdx].level} · {featuredCourses[featuredIdx].duration}</div>
                    <p className="text-gray-400 text-base mb-4 line-clamp-3">{featuredCourses[featuredIdx].description}</p>
                    <Link href={`/courses/${featuredCourses[featuredIdx].id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-xs font-semibold transition">View Details</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex gap-2 justify-center mt-4">
              {featuredCourses.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === featuredIdx ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setFeaturedIdx(i)}
                  aria-label={`Go to featured course ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Popular Categories Widget */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
          <div className="flex gap-3 flex-wrap">
            {popularCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSearch(cat.label)}
                className="px-4 py-2 bg-blue-950/40 text-blue-300 rounded-full text-sm font-medium border border-blue-900/30 cursor-pointer hover:bg-blue-600 hover:text-white transition"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>
        {/* Filters */}
        <section className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-700 bg-[#18182f] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          />
          <div className="w-full md:w-1/4">
            <label htmlFor="category-select" className="sr-only">Filter by category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-700 bg-[#18182f] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </section>
        {/* Courses Grid */}
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading courses...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No courses found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-[#23234a] rounded-2xl p-5 flex flex-col shadow-lg border border-[#23234a] hover:border-blue-600 transition group cursor-pointer">
                <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden">
                  <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition duration-300" />
                </div>
                <span className="text-xs uppercase tracking-wider text-blue-400 bg-blue-950/40 px-2 py-1 rounded mb-2 self-start">{course.category}</span>
                <h3 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition">{course.title}</h3>
                <div className="text-gray-400 text-xs mb-2">By {course.instructor.name}</div>
                <div className="text-gray-300 text-xs mb-4">{course.level} · {course.duration}</div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                <Link href={`/courses/${course.id}`} className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-xs font-semibold transition text-center">View Details</Link>
              </div>
            ))}
          </div>
        )}
        {/* Pagination placeholder */}
        {/* <div className="flex justify-center mt-10">
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-l">Prev</button>
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-r">Next</button>
        </div> */}
      </div>
    </main>
  );
};

export default CoursesListPage; 