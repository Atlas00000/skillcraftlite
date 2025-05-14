import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';
import { animations, transitions } from '../utils/animations';

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Student',
  joinDate: '2024-01-15',
  bio: 'Passionate about web development and learning new technologies.',
  stats: {
    coursesCompleted: 5,
    totalXP: 2500,
    currentLevel: 8,
    nextLevelXP: 3000,
  },
  skills: [
    { name: 'HTML', level: 'Advanced' },
    { name: 'CSS', level: 'Intermediate' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'React', level: 'Beginner' },
  ],
  achievements: [
    { id: 1, title: 'Fast Learner', description: 'Completed 5 courses in one month', date: '2024-02-15' },
    { id: 2, title: 'Perfect Score', description: 'Achieved 100% in a course', date: '2024-02-20' },
    { id: 3, title: 'Early Bird', description: 'Started learning before 8 AM', date: '2024-03-01' },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio);

  const handleSaveProfile = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsEditing(false);
    // Handle profile update logic
  };

  return (
    <div className="container mx-auto p-4">
      <div className={`mb-8 ${animations.fadeIn}`}>
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${user.name}&size=128&background=6366f1&color=fff`}
            alt={user.name}
            size="xl"
            status="online"
            className="mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="mb-2 text-gray-600 dark:text-gray-300">{user.email}</p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="primary">{user.role}</Badge>
              <Badge variant="secondary">Member since {new Date(user.joinDate).toLocaleDateString()}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className={`mb-8 ${animations.slideUp}`}>
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
              )}
            </div>

            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant={skill.level === 'Advanced' ? 'success' : skill.level === 'Intermediate' ? 'primary' : 'secondary'}
                  >
                    {skill.name} - {skill.level}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Achievements</h2>
              <div className="space-y-4">
                {user.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
                      <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className={`sticky top-4 ${animations.slideIn}`}>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Progress</h2>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Level {user.stats.currentLevel}</span>
                  <span className="text-gray-900 dark:text-white">{user.stats.totalXP} / {user.stats.nextLevelXP} XP</span>
                </div>
                <ProgressBar
                  progress={(user.stats.totalXP / user.stats.nextLevelXP) * 100}
                  size="lg"
                  color="purple"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {user.stats.coursesCompleted}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Courses Completed</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {user.stats.totalXP}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Total XP</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 