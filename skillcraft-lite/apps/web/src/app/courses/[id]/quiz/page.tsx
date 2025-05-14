import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = () => {
    console.log('Quiz submitted for course:', course?.id);
  };

  if (!course) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Quiz: {course.title}</h1>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
        <p className="text-gray-600">This is a placeholder quiz for the course.</p>
        <button
          onClick={handleSubmit}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
} 