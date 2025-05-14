'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const mockUsers = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@email.com', role: 'admin' },
  { id: 'u2', name: 'Priya S.', email: 'priya@email.com', role: 'user' },
  { id: 'u3', name: 'Miguel R.', email: 'miguel@email.com', role: 'user' },
];

const AdminPage = () => {
  // RBAC: mock admin check
  const isAdmin = true; // set to false to test non-admin view
  const [tab, setTab] = useState<'courses' | 'users'>('courses');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tab === 'courses') {
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
    }
  }, [tab]);

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans px-4">
        <div className="bg-[#23234a] rounded-2xl p-10 shadow-lg border border-[#23234a] text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Only</h1>
          <p className="text-gray-400">You do not have permission to view this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-auto px-4 pb-16">
      <div className="max-w-6xl mx-auto pt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Admin Dashboard</h1>
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button onClick={() => setTab('courses')} className={`px-4 py-2 font-semibold transition border-b-2 ${tab === 'courses' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-300 hover:text-blue-400'}`}>Courses</button>
          <button onClick={() => setTab('users')} className={`px-4 py-2 font-semibold transition border-b-2 ${tab === 'users' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-300 hover:text-blue-400'}`}>Users</button>
        </div>
        {tab === 'courses' && (
          <section>
            <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
            {loading ? (
              <div className="text-center text-gray-400 py-12">Loading courses...</div>
            ) : error ? (
              <div className="text-center text-red-400 py-12">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-[#23234a] rounded-2xl shadow-lg border border-[#23234a]">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Level</th>
                      <th className="py-3 px-4">Instructor</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-t border-gray-800 hover:bg-blue-950/20 transition">
                        <td className="py-3 px-4 font-semibold text-white">{course.title}</td>
                        <td className="py-3 px-4 text-blue-300">{course.category}</td>
                        <td className="py-3 px-4 text-purple-300">{course.level}</td>
                        <td className="py-3 px-4 text-gray-200">{course.instructor.name}</td>
                        <td className="py-3 px-4 flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold transition">View</button>
                          <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-semibold transition">Edit</button>
                          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-semibold transition">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
        {tab === 'users' && (
          <section>
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#23234a] rounded-2xl shadow-lg border border-[#23234a]">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-t border-gray-800 hover:bg-blue-950/20 transition">
                      <td className="py-3 px-4 font-semibold text-white">{user.name}</td>
                      <td className="py-3 px-4 text-blue-300">{user.email}</td>
                      <td className="py-3 px-4 text-purple-300">{user.role}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold transition">View</button>
                        <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-semibold transition">Edit</button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs font-semibold transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminPage; 