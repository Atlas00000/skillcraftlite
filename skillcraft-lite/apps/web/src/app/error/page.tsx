import React from 'react';
import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Oops! Something went wrong.</h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">We couldn't find the page you're looking for.</p>
        <button
          onClick={() => router.push('/')}
          className="rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
} 