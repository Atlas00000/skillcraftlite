'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const mockLessons = [
  { id: 'l1', title: 'Welcome & Overview', duration: '5m' },
  { id: 'l2', title: 'Core Concepts', duration: '18m' },
  { id: 'l3', title: 'Hands-on Project', duration: '30m' },
  { id: 'l4', title: 'Quiz & Recap', duration: '10m' },
];

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'lessons' | 'notes' | 'quiz'>('lessons');
  const [progress, setProgress] = useState(40); // mock progress

  useEffect(() => {
    setLoading(true);
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        const found = data.courses.find((c: any) => c.id === id);
        setCourse(found);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load course');
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-hidden px-4 pb-16">
      <div className="max-w-4xl mx-auto pt-16">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading course...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : !course ? (
          <div className="text-center text-gray-400 py-12">Course not found.</div>
        ) : (
          <>
            {/* Course Hero */}
            <section className="flex flex-col md:flex-row gap-8 mb-10 items-center md:items-start">
              <img src={course.imageUrl} alt={course.title} className="rounded-2xl w-full md:w-64 h-40 object-cover mb-4 md:mb-0" />
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{course.title}</h1>
                <div className="text-gray-400 text-sm mb-2">By {course.instructor.name}</div>
                <div className="text-gray-300 text-xs mb-4">{course.level} · {course.duration}</div>
                <p className="text-gray-400 text-base mb-4 line-clamp-3">{course.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-blue-600/20 text-blue-300 px-4 py-1 rounded-full font-medium">Category: <span className="text-blue-400 font-bold">{course.category}</span></span>
                  <span className="bg-purple-600/20 text-purple-300 px-4 py-1 rounded-full font-medium">Progress: <span className="text-purple-400 font-bold">{progress}%</span></span>
                </div>
                {/* Progress Bar */}
                <div className="w-full max-w-xs mt-4">
                  <div className="flex justify-between mb-1 text-xs text-gray-400">
                    <span>Course Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Tabs */}
            <section className="mb-8">
              <div className="flex gap-4 border-b border-gray-700 mb-6">
                <button onClick={() => setActiveTab('lessons')} className={`px-4 py-2 font-semibold transition border-b-2 ${activeTab === 'lessons' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-300 hover:text-blue-400'}`}>Lessons</button>
                <button onClick={() => setActiveTab('notes')} className={`px-4 py-2 font-semibold transition border-b-2 ${activeTab === 'notes' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-300 hover:text-blue-400'}`}>Notes</button>
                <button onClick={() => setActiveTab('quiz')} className={`px-4 py-2 font-semibold transition border-b-2 ${activeTab === 'quiz' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-300 hover:text-blue-400'}`}>Quiz</button>
              </div>
              {/* Tab Content */}
              {activeTab === 'lessons' && (
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Video Player (mock) */}
                  <div className="flex-1 bg-[#23234a] rounded-2xl p-6 shadow-lg border border-[#23234a] mb-6 md:mb-0">
                    <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-gray-500 text-2xl font-bold">
                      Video Player
                    </div>
                  </div>
                  {/* Lessons List */}
                  <div className="w-full md:w-64 bg-[#23234a] rounded-2xl p-6 shadow-lg border border-[#23234a]">
                    <h3 className="text-lg font-bold mb-4">Lessons</h3>
                    <ul className="space-y-3">
                      {mockLessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center gap-3">
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-900 text-blue-300 font-bold">{lesson.id.slice(-1)}</span>
                          <span className="flex-1 text-gray-200">{lesson.title}</span>
                          <span className="text-xs text-gray-400">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === 'notes' && (
                <div className="bg-[#23234a] rounded-2xl p-6 shadow-lg border border-[#23234a] min-h-[200px]">
                  <h3 className="text-lg font-bold mb-4">Notebook</h3>
                  <textarea className="w-full min-h-[120px] rounded-lg bg-[#18182f] border border-gray-700 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your notes here..." />
                </div>
              )}
              {activeTab === 'quiz' && (
                <div className="bg-[#23234a] rounded-2xl p-6 shadow-lg border border-[#23234a] min-h-[200px]">
                  <h3 className="text-lg font-bold mb-4">Quiz</h3>
                  <p className="text-gray-400">Quiz functionality coming soon!</p>
                </div>
              )}
            </section>
            <Link href="/courses" className="inline-block mt-8 text-blue-400 hover:underline">← Back to Courses</Link>
          </>
        )}
      </div>
    </main>
  );
};

export default CourseDetailPage; 