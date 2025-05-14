import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

// Mock data for dashboard
const userProgress = {
  completedCourses: 3,
  inProgressCourses: 2,
  totalXP: 1250,
  level: 5,
  recentActivity: [
    {
      id: 1,
      type: 'course_completed',
      title: 'Web Development Fundamentals',
      date: '2024-03-15',
    },
    {
      id: 2,
      type: 'lesson_completed',
      title: 'CSS Basics - Week 3',
      date: '2024-03-14',
    },
    {
      id: 3,
      type: 'achievement_earned',
      title: 'Fast Learner',
      date: '2024-03-13',
    },
  ],
  enrolledCourses: [
    {
      id: 1,
      title: 'Advanced React Patterns',
      progress: 65,
      nextLesson: 'State Management with Redux',
    },
    {
      id: 2,
      title: 'UI/UX Design Principles',
      progress: 30,
      nextLesson: 'Color Theory and Typography',
    },
  ],
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {userProgress.completedCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completed Courses</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {userProgress.inProgressCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {userProgress.totalXP}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total XP</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Level {userProgress.level}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Current Level</div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Enrolled Courses</h2>
          <div className="space-y-4">
            {userProgress.enrolledCourses.map((course) => (
              <Card key={course.id}>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                <div className="mb-2">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Progress</span>
                    <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Next: {course.nextLesson}
                </p>
                <Button>Continue Learning</Button>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <Card>
            <div className="space-y-4">
              {userProgress.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {activity.type.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 