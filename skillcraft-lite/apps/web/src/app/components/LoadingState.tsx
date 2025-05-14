import React from 'react';
import { animations } from '../utils/animations';

interface LoadingStateProps {
  type?: 'card' | 'list' | 'table' | 'profile';
  error?: Error | string;
  retry?: () => void;
}

export default function LoadingState({ type = 'card', error, retry }: LoadingStateProps) {
  if (error) {
    return (
      <div className={`rounded-lg bg-red-50 p-4 dark:bg-red-900/20 ${animations.fadeIn}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400 dark:text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              {typeof error === 'string' ? error : error.message}
            </h3>
            {retry && (
              <div className="mt-2">
                <button
                  onClick={retry}
                  className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  switch (type) {
    case 'card':
      return (
        <div className={`space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700 ${animations.fadeIn}`}>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      );

    case 'list':
      return (
        <div className={`space-y-4 ${animations.fadeIn}`}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      );

    case 'table':
      return (
        <div className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 ${animations.fadeIn}`}>
          <div className="animate-pulse">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className={`space-y-6 ${animations.fadeIn}`}>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      );

    default:
      return null;
  }
} 